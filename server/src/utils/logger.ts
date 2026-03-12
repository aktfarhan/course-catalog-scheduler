import * as cliProgress from 'cli-progress';
import colors from 'ansi-colors';

const BOX_WIDTH = 62;
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

// Each pipeline phase has its own accent color.
const PHASE_PALETTE = [colors.magenta, colors.yellow, colors.cyan, colors.blue, colors.green];

interface PhaseRecord {
    number: number;
    name: string;
    duration: number;
}

/**
 * Formats a duration in milliseconds to a human-readable string.
 *
 * @param ms - Duration in milliseconds.
 * @returns Formatted string like "0.30s", "45.12s", "2m 15s", "1h 12m".
 */
function formatDuration(ms: number): string {
    // Round to 2 decimals so 59.999s becomes 60 and falls through to minutes
    const totalSeconds = Math.round(ms / 10) / 100;
    if (totalSeconds < 60) return `${totalSeconds.toFixed(2)}s`;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    if (minutes < 60) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

// Draws a horizontal box line with corner characters.
function boxLine(left: string, char: string, right: string): string {
    return `${left}${char.repeat(BOX_WIDTH)}${right}`;
}

// Pads text to fit inside the box with borders. rawLength excludes ANSI codes.
function boxRow(text: string, rawLength: number): string {
    const padding = BOX_WIDTH - 2 - rawLength;
    return `│ ${text}${' '.repeat(Math.max(0, padding))} │`;
}

class PipelineLogger {
    // ----- Progress Bar -----
    private progressBar: cliProgress.SingleBar | null = null;
    private frameIndex = 0;
    private spinnerInterval: NodeJS.Timeout | null = null;
    private taskStart = 0;

    // ----- Phase Tracking -----
    private phases: PhaseRecord[] = [];
    private currentPhaseStart = 0;
    private currentPhaseNumber = 0;
    private currentPhaseName = '';

    // ----- Pipeline Tracking -----
    private pipelineStart = 0;

    // Returns the accent color for the current phase (falls back to first color).
    private get phaseColor() {
        if (this.currentPhaseNumber === 0) return PHASE_PALETTE[0];
        return PHASE_PALETTE[(this.currentPhaseNumber - 1) % PHASE_PALETTE.length];
    }

    // Records the current phase's duration and resets phase number to prevent double-recording.
    private recordPhase() {
        if (this.currentPhaseNumber === 0) return;
        this.phases.push({
            number: this.currentPhaseNumber,
            name: this.currentPhaseName,
            duration: Date.now() - this.currentPhaseStart,
        });
        this.currentPhaseNumber = 0;
    }

    // ----- Pipeline Lifecycle -----

    // Resets all internal state for a fresh pipeline run.
    private reset() {
        this.stop();
        this.phases = [];
        this.currentPhaseNumber = 0;
        this.currentPhaseName = '';
        this.currentPhaseStart = 0;
    }

    // Prints the pipeline header box and starts the global timer.
    header() {
        this.reset();
        this.pipelineStart = Date.now();
        const now = new Date();
        const date = now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const timestamp = `${date} · ${time}`;

        const title = '⚡ PIPELINE UPDATE';
        // +1 because ⚡ occupies 2 terminal columns
        const titleWidth = title.length + 1;
        const gap = BOX_WIDTH - 2 - titleWidth - timestamp.length;

        console.log('');
        console.log(colors.cyan(boxLine('┌', '─', '┐')));
        console.log(
            colors.cyan(
                boxRow(
                    `${colors.bold.white(title)}${' '.repeat(gap)}${colors.gray(timestamp)}`,
                    titleWidth + gap + timestamp.length,
                ),
            ),
        );
        console.log(colors.cyan(boxLine('└', '─', '┘')));
        console.log('');
    }

    /**
     * Marks the start of a new pipeline phase.
     * Automatically records the previous phase's duration.
     *
     * @param number - Phase number (1-5).
     * @param name - Phase display name.
     */
    phase(number: number, name: string) {
        this.stop();
        if (this.currentPhaseNumber > 0) {
            this.recordPhase();
            console.log('');
        }

        this.currentPhaseNumber = number;
        this.currentPhaseName = name;
        this.currentPhaseStart = Date.now();

        const badge = colors.bold(this.phaseColor(`Phase ${number}`));
        console.log(
            `  ${this.phaseColor('◆')} ${badge} ${colors.gray('│')} ${colors.bold.white(name)}`,
        );
    }

    // ----- Task Progress -----

    /**
     * Starts a progress bar for a task within the current phase.
     *
     * @param total - Total number of items to process.
     * @param label - Short description of the task.
     */
    startTask(total: number, label: string = '') {
        this.stop();
        console.log('');

        const accent = this.phaseColor;
        const sep = colors.gray('│');
        const totalWidth = String(total).length;

        this.progressBar = new cliProgress.SingleBar({
            format:
                `    {spinner}  ${accent('{bar}')} ${colors.white('{percentage}%')} ` +
                `${sep} ${colors.white('{value}/{total}')} ` +
                `${sep} ${colors.white('{label}')} ` +
                `${sep} ${accent('{elapsed}')}`,
            // Pad percentage and value so the stats don't shift as digits grow
            formatValue: (value, _options, type) => {
                if (type === 'percentage') return String(value).padStart(3);
                if (type === 'value') return String(value).padStart(totalWidth);
                return String(value);
            },
            hideCursor: true,
            barCompleteChar: '█',
            barIncompleteChar: '░',
            barsize: 30,
        });

        this.frameIndex = 0;
        this.taskStart = Date.now();

        this.progressBar.start(total, 0, {
            spinner: accent(SPINNER_FRAMES[0]),
            label,
            elapsed: '0.00s',
        });

        this.spinnerInterval = setInterval(() => {
            if (!this.progressBar) return;
            this.frameIndex = (this.frameIndex + 1) % SPINNER_FRAMES.length;
            this.progressBar.update({
                spinner: accent(SPINNER_FRAMES[this.frameIndex]),
                elapsed: formatDuration(Date.now() - this.taskStart),
            });
        }, 80);
    }

    /**
     * Updates the progress bar to the given value.
     *
     * @param current - Current progress count.
     */
    updateTask(current: number) {
        if (!this.progressBar) return;
        this.progressBar.update(current, { elapsed: formatDuration(Date.now() - this.taskStart) });
    }

    // Completes the current progress bar with a checkmark.
    completeTask() {
        if (!this.progressBar) return;
        this.progressBar.update(this.progressBar.getTotal(), {
            spinner: colors.green('✓'),
            elapsed: formatDuration(Date.now() - this.taskStart),
        });
        this.stop();
        process.stdout.write('\n');
    }

    /**
     * Prints a status line with a checkmark for instant operations.
     *
     * @param message - Status message to display.
     */
    info(message: string) {
        console.log(`    ${colors.green('✓')} ${this.phaseColor(message)}`);
    }

    // ----- Summary & Cleanup -----

    // Prints the final summary table with per-phase timing.
    summary() {
        this.stop();
        this.recordPhase();

        const totalDuration = Date.now() - this.pipelineStart;
        if (this.phases.length === 0) return;
        const maxNameLen = Math.max(...this.phases.map((p) => p.name.length));

        console.log('');
        console.log(colors.green(boxLine('┌', '─', '┐')));
        // +1 because ✨ occupies 2 terminal columns
        const completeTitle = '✨ PIPELINE COMPLETE';
        console.log(
            colors.green(boxRow(colors.bold.green(completeTitle), completeTitle.length + 1)),
        );
        console.log(colors.green(boxLine('├', '─', '┤')));

        for (const phase of this.phases) {
            const accent = PHASE_PALETTE[(phase.number - 1) % PHASE_PALETTE.length];
            const num = `Phase ${phase.number}`;
            const dur = formatDuration(phase.duration);
            const dots = '·'.repeat(maxNameLen - phase.name.length + 4);
            const rawRow = `  ${num}  ${phase.name} ${dots} ${dur}`;
            const coloredRow =
                `  ${accent(num)}  ${colors.white(phase.name)} ${colors.gray(dots)} ${colors.bold.white(dur)}`;
            console.log(colors.green(boxRow(coloredRow, rawRow.length)));
        }

        // Total row
        console.log(colors.green(boxLine('├', '─', '┤')));
        const totalRow = `  Total ${'·'.repeat(maxNameLen + 12)} ${formatDuration(totalDuration)}`;
        console.log(colors.green(boxRow(colors.bold.white(totalRow), totalRow.length)));
        console.log(colors.green(boxLine('└', '─', '┘')));
        console.log('');
    }

    /**
     * Prints an error box and cleans up.
     *
     * @param error - The error that occurred.
     */
    error(error: unknown) {
        this.stop();
        console.log('');
        console.log(colors.red(boxLine('┌', '─', '┐')));
        // +1 because ❌ occupies 2 terminal columns
        const failTitle = '❌ PIPELINE FAILED';
        console.log(colors.red(boxRow(colors.bold.red(failTitle), failTitle.length + 1)));
        console.log(colors.red(boxLine('└', '─', '┘')));
        console.log('');
        console.error(error);
        console.log('');
    }

    // Stops the spinner and progress bar without completing.
    stop() {
        if (this.spinnerInterval) clearInterval(this.spinnerInterval);
        this.spinnerInterval = null;
        if (this.progressBar) this.progressBar.stop();
        this.progressBar = null;
    }
}

export const logger = new PipelineLogger();
