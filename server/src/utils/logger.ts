import * as cliProgress from 'cli-progress';
import colors from 'ansi-colors';

class PipelineLogger {
    private progressBar: cliProgress.SingleBar;
    private spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    private frameIndex = 0;
    private spinnerInterval: NodeJS.Timeout | null = null;

    constructor() {
        this.progressBar = new cliProgress.SingleBar({
            // Added {label} to the right side for clarification
            format: `${colors.cyan('{spinner}')} ${colors.blue('{bar}')} ${colors.magenta('{percentage}%')} ${colors.gray('| {label}')}`,
            hideCursor: true,
            barCompleteChar: '█',
            barIncompleteChar: '░',
            barsize: 40,
        });
    }

    // Now accepts an optional label string
    startTask(total: number, label: string = '') {
        if (this.spinnerInterval) clearInterval(this.spinnerInterval);

        this.frameIndex = 0;
        this.progressBar.start(total, 0, {
            spinner: this.spinnerFrames[0],
            label: label, // Initialize the label
        });

        this.spinnerInterval = setInterval(() => {
            this.frameIndex = (this.frameIndex + 1) % this.spinnerFrames.length;
            this.progressBar.update(this.progressBar.getProgress() * this.progressBar.getTotal(), {
                spinner: colors.cyan(this.spinnerFrames[this.frameIndex]),
                label: label, // Keep the label persistent during the spin
            });
        }, 80);
    }

    updateTask(current: number) {
        this.progressBar.update(current);
    }

    completeTask() {
        if (this.spinnerInterval) clearInterval(this.spinnerInterval);

        this.progressBar.update(this.progressBar.getTotal(), {
            spinner: colors.green('✔ '),
        });
        this.progressBar.stop();
        process.stdout.write('\n');
    }

    stop() {
        if (this.spinnerInterval) clearInterval(this.spinnerInterval);
        this.progressBar.stop();
    }
}

export const logger = new PipelineLogger();
