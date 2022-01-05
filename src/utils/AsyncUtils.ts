/**
 * Wait for a duration
 * @param duration Wait duration in milliseconds
 */
export async function wait(duration: number) {
    return await new Promise(resolve => setTimeout(resolve, duration))
}