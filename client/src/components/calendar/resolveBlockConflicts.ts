import type { Block, Day } from '../../types';

/**
 * Detect overlapping blocks and assign side-by-side column positions.
 * Uses a sweep-line algorithm to group overlapping blocks, then greedily
 * assigns each block to the first non-overlapping column.
 *
 * @param grouped - Blocks grouped by day key
 * @param days - Array of visible day keys (M-F or M-Su)
 */
export function resolveBlockConflicts(grouped: Record<string, Block[]>, days: Day[]) {
    for (const day of days) {
        const dayBlocks = grouped[day];

        // Skip days with 0 or 1 block, no conflicts possible
        if (dayBlocks.length < 2) continue;

        // Sort by start time so the sweep reads left-to-right
        dayBlocks.sort((a, b) => a.startMins - b.startMins || a.endMins - b.endMins);

        // Track the current collision group's start index and furthest end time
        let groupStart = 0;
        let maxEnd = dayBlocks[0].endMins;

        for (let i = 1; i <= dayBlocks.length; i++) {
            if (i < dayBlocks.length && dayBlocks[i].startMins < maxEnd) {
                // Push the group boundary forward to the latest end time seen
                maxEnd = Math.max(maxEnd, dayBlocks[i].endMins);
                continue;
            }

            // Conflict group [groupStart, i), assign side-by-side columns
            if (i - groupStart > 1) {
                const columns: Block[][] = [];

                // Greedy: place each block in the first column with no overlap
                for (let j = groupStart; j < i; j++) {
                    const block = dayBlocks[j];

                    // Find a column where the last block ends before this one starts
                    const col = columns.findIndex(
                        (column) => column[column.length - 1].endMins <= block.startMins,
                    );

                    if (col !== -1) {
                        // Fit into existing column
                        columns[col].push(block);
                        block.columnIndex = col;
                    } else {
                        // Open a new column
                        block.columnIndex = columns.length;
                        columns.push([block]);
                    }

                    // Mark every block in a multi-block group as conflicting
                    block.hasConflict = true;
                }

                // All blocks in the group share the same total column count
                for (let j = groupStart; j < i; j++) {
                    dayBlocks[j].totalColumns = columns.length;
                }
            }

            // Reset for the next group
            groupStart = i;
            if (i < dayBlocks.length) maxEnd = dayBlocks[i].endMins;
        }
    }
}
