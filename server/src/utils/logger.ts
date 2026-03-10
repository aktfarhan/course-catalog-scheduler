import * as cliProgress from 'cli-progress';
import colors from 'ansi-colors';

const BOX_WIDTH = 62;
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/** Each pipeline phase gets its own accent color. */
const PHASE_PALETTE = [
    colors.magenta,
    colors.yellow,
    colors.cyan,
    colors.blue,
    colors.green,
];

/**
 * Formats a duration in milliseconds to a human-readable string.
 *
 * @param ms - Duration in milliseconds
 * @returns Formatted string like "0.3s", "45s", "2m 15s", "1h 12m"
 */
function formatDuration(ms: number): string {
    const totalSeconds = ms / 1000;
    if (totalSeconds < 1) return `${totalSeconds.toFixed(1)}s`;
    if (totalSeconds < 60) return `${Math.round(totalSeconds)}s`;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    if (minutes < 60) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/**
 * Draws a horizontal line with corner characters.
 *
 * @param left - Left corner character
 * @param char - Border character to repeat
 * @param right - Right corner character
 */
function boxLine(left: string, char: string, right: string): string {
    return `${left}${char.repeat(BOX_WIDTH)}${right}`;
}

/**
 * Pads a string to fit inside the box with borders.
 *
 * @param text - Content to display (may contain ANSI codes)
 * @param rawLength - The visible length of text (without ANSI codes)
 */
function boxRow(text: string, rawLength: number): string {
    const padding = BOX_WIDTH - 2 - rawLength;
    return `│ ${text}${' '.repeat(Math.max(0, padding))} │`;
}

interface PhaseRecord {
    number: number;
    name: string;
    duration: number;
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

    /**
     * Returns the accent color for the current phase.
     */
    private get phaseColor() {
        return PHASE_PALETTE[(this.currentPhaseNumber - 1) % PHASE_PALETTE.length];
    }

    // ----- Pipeline Lifecycle -----

    /**
     * Prints the pipeline header box and starts the global timer.
     */
    header() {
        this.pipelineStart = Date.now();
        const now = new Date();
        const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const timestamp = `${date} · ${time}`;

        const title = '⚡ PIPELINE UPDATE';
        const titleWidth = title.length + 1; // ⚡ occupies 2 terminal columns
        const gap = BOX_WIDTH - 2 - titleWidth - timestamp.length;

        console.log('');
        console.log(colors.cyan(boxLine('┌', '─', '┐')));
        console.log(colors.cyan(boxRow(
            `${colors.bold.white(title)}${' '.repeat(gap)}${colors.gray(timestamp)}`,
            titleWidth + gap + timestamp.length,
        )));
        console.log(colors.cyan(boxLine('└', '─', '┘')));
        console.log('');
    }

    /**
     * Marks the start of a new pipeline phase.
     * Automatically records the previous phase's duration.
     *
     * @param number - Phase number (1-5)
     * @param name - Phase display name
     */
    phase(number: number, name: string) {
        // Record previous phase if one was running
        if (this.currentPhaseNumber > 0) {
            this.phases.push({
                number: this.currentPhaseNumber,
                name: this.currentPhaseName,
                duration: Date.now() - this.currentPhaseStart,
            });
            console.log('');
        }

        this.currentPhaseNumber = number;
        this.currentPhaseName = name;
        this.currentPhaseStart = Date.now();

        const accent = PHASE_PALETTE[(number - 1) % PHASE_PALETTE.length];
        const badge = colors.bold(accent(`Phase ${number}`));
        const label = colors.bold.white(name);
        console.log(`  ${accent('◆')} ${badge} ${colors.gray('│')} ${label}`);
    }

    // ----- Task Progress -----

    /**
     * Starts a progress bar for a task within the current phase.
     * Bar color matches the current phase's accent color.
     *
     * @param total - Total number of items to process
     * @param label - Short description of the task
     */
    startTask(total: number, label: string = '') {
        if (this.spinnerInterval) clearInterval(this.spinnerInterval);

        const accent = this.phaseColor;

        // Create a fresh bar colored to match the current phase
        this.progressBar = new cliProgress.SingleBar({
            format: `    {spinner} ${accent('{bar}')} ${colors.white('{percentage}%')} ${colors.gray('│')} ${colors.white('{value}/{total}')} ${colors.gray('│')} ${colors.white('{label}')} ${colors.gray('│')} ${accent('{elapsed}')}`,
            hideCursor: true,
            barCompleteChar: '█',
            barIncompleteChar: '░',
            barsize: 30,
        });

        this.frameIndex = 0;
        this.taskStart = Date.now();

        this.progressBar.start(total, 0, {
            spinner: SPINNER_FRAMES[0],
            label,
            elapsed: '0s',
        });

        this.spinnerInterval = setInterval(() => {
            this.frameIndex = (this.frameIndex + 1) % SPINNER_FRAMES.length;
            const elapsed = formatDuration(Date.now() - this.taskStart);
            this.progressBar!.update({
                spinner: accent(SPINNER_FRAMES[this.frameIndex]),
                elapsed,
            });
        }, 80);
    }

    /**
     * Updates the progress bar to the given value.
     *
     * @param current - Current progress count
     */
    updateTask(current: number) {
        const elapsed = formatDuration(Date.now() - this.taskStart);
        this.progressBar!.update(current, { elapsed });
    }

    /**
     * Completes the current progress bar with a checkmark.
     */
    completeTask() {
        if (this.spinnerInterval) clearInterval(this.spinnerInterval);

        const elapsed = formatDuration(Date.now() - this.taskStart);
        this.progressBar!.update(this.progressBar!.getTotal(), {
            spinner: colors.green('✔'),
            elapsed,
        });
        this.progressBar!.stop();
        process.stdout.write('\n');
    }

    /**
     * Prints a quick status line with a checkmark. Use for instant operations
     * that don't need a progress bar (e.g. building a Map, writing a file).
     *
     * @param message - Status message to display
     */
    info(message: string) {
        const accent = this.phaseColor;
        console.log(`    ${colors.green('✔')} ${accent(message)}`);
    }

    // ----- Summary & Cleanup -----

    /**
     * Prints the final summary table with per-phase timing.
     * Each phase row is colored with its own accent.
     */
    summary() {
        // Record the last phase
        if (this.currentPhaseNumber > 0) {
            this.phases.push({
                number: this.currentPhaseNumber,
                name: this.currentPhaseName,
                duration: Date.now() - this.currentPhaseStart,
            });
        }

        const totalDuration = Date.now() - this.pipelineStart;
        const maxNameLen = Math.max(...this.phases.map((p) => p.name.length));

        console.log('');
        console.log(colors.green(boxLine('┌', '─', '┐')));
        console.log(colors.green(boxRow(
            `${colors.bold.green('✨ PIPELINE COMPLETE')}`,
            '✨ PIPELINE COMPLETE'.length + 1, // ✨ occupies 2 terminal columns
        )));
        console.log(colors.green(boxLine('├', '─', '┤')));

        // Phase rows — each colored with its accent
        for (const phase of this.phases) {
            const accent = PHASE_PALETTE[(phase.number - 1) % PHASE_PALETTE.length];
            const num = `Phase ${phase.number}`;
            const name = phase.name;
            const dur = formatDuration(phase.duration);
            const dots = '·'.repeat(maxNameLen - name.length + 4);
            const rawRow = `  ${num}  ${name} ${dots} ${dur}`;
            const coloredRow = `  ${accent(num)}  ${colors.white(name)} ${colors.gray(dots)} ${colors.bold.white(dur)}`;
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
     * @param error - The error that occurred
     */
    error(error: unknown) {
        this.stop();
        console.log('');
        console.log(colors.red(boxLine('┌', '─', '┐')));
        console.log(colors.red(boxRow(
            `${colors.bold.red('❌ PIPELINE FAILED')}`,
            '❌ PIPELINE FAILED'.length + 1, // ❌ occupies 2 terminal columns
        )));
        console.log(colors.red(boxLine('└', '─', '┘')));
        console.error(colors.red('\n'), error);
        console.log('');
    }

    /**
     * Stops the spinner and progress bar without completing.
     */
    stop() {
        if (this.spinnerInterval) clearInterval(this.spinnerInterval);
        if (this.progressBar) this.progressBar.stop();
    }
}

export const logger = new PipelineLogger();
