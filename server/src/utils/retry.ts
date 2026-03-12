/**
 * Retries an async function up to `maxRetries` times with exponential backoff.
 *
 * @param fn - Async function to attempt.
 * @param maxRetries - Maximum number of attempts (default 3).
 * @param baseDelay - Base delay in ms between retries (default 1000).
 * @returns The result of the function.
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000,
): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            // Wait before retrying (exponential backoff), skip delay on last attempt
            if (attempt < maxRetries - 1) {
                await new Promise((resolve) => setTimeout(resolve, baseDelay * 2 ** attempt));
            }
        }
    }

    throw lastError;
}
