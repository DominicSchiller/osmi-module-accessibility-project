/**
 * Utility class to manage UI related components and actions of a senso game.
 */
export class SensoUIHelper {
    /**
     * Duration constant how long a randomly selected button is displayed to the user
     * @private
     */
    private static readonly ShowButtonDuration = 1500 // in ms
    /**
     * Pause duration between showing randomly selected buttons to the user
     * @private
     */
    private static readonly ShowButtonBreakInterval = 750 // in ms

    private constructor() {}

    /**
     * Highlight a specific button within the senso's UI.
     * @param buttonID The unique identifier of the button which to highlight
     * @private
     */
    public static highlightButton(buttonID: string) {
        return new Promise<void>( resolve => {
            const button = document.getElementById(buttonID)!
            SensoUIHelper.toggleHighlighting(button)
            setTimeout(() => {
                SensoUIHelper.toggleHighlighting(button)
                setTimeout(() => {
                    resolve();
                }, SensoUIHelper.ShowButtonBreakInterval)
            }, SensoUIHelper.ShowButtonDuration)
        });
    }

    /**
     * Toggle the highlighting of a senso action button.
     * @param button The senso's action button whose highlighting will be toggled
     */
    public static toggleHighlighting(button: HTMLElement) {
        const buttonRow = button.closest(".button-row")
        buttonRow?.classList.toggle("selected")
        button.classList.toggle("selected")

        const subtitleLabel = document.getElementById("subtitle")!
        const isSubtitleSet = subtitleLabel.innerHTML !== "&nbsp;"
        subtitleLabel.innerHTML = isSubtitleSet ? "&nbsp;" : button.ariaLabel
    }

    /**
     * Shows the status when a round as been completed successfully.
     * @param attempts The total number fo attempts
     * @param totalColors the total number of colors to remember
     */
    public static showRoundStatus(attempts: number, totalColors: number) {
        document.getElementById("game-request-title")!.innerHTML = `${attempts} Versuche für ${totalColors} Farben benötigt`
        document.getElementById("subtitle")!.innerHTML = "Geschafft"
    }
}