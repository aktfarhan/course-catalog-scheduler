/**
 * Retries an async function up to `maxRetries` times with exponential backoff.
 *
 * @param fn - Async function to attempt
 * @param maxRetries - Maximum number of attempts (default 3)
 * @param baseDelay - Base delay in ms between retries (default 1000)
 * @returns The result of the function
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000,
): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) throw error;
            const delay = baseDelay * Math.pow(2, attempt - 1);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    throw new Error('Unreachable');
}
