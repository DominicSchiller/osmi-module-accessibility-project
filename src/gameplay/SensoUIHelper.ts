/**
 * Utility class to manage UI related components and actions of a senso game.
 */
import {SensoAudioPlayer} from "./SensoAudioPlayer";
import {Accessibility} from "../app/context/AccessibilityContext";

export class SensoUIHelper {
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
            SensoAudioPlayer.playButtonSound(button.dataset.sound)
            setTimeout(() => {
                SensoUIHelper.toggleHighlighting(button)
                setTimeout(() => {
                    resolve();
                }, SensoUIHelper.ShowButtonBreakInterval)
            }, this.getSensoButtonHighlightDuration())
        });
    }

    public static showSensoTapFeedback(isCorrect: boolean = true) {
        let repeatControl = document.getElementById("repeat-sequence-stack")
        document.getElementById("correct-tap-feedback")?.classList.add("hidden")
        document.getElementById("wrong-tap-feedback")?.classList.add("hidden")
        let feedbackContainer = document.getElementById(`${isCorrect ? "correct" : "wrong"}-tap-feedback`)

        if (repeatControl) {
            repeatControl.classList.add("hidden")
        }
        if (feedbackContainer) {
           feedbackContainer.classList.remove("hidden")
        }
        setTimeout(() => {
            if (feedbackContainer) {
                feedbackContainer.classList.add("hidden")
            }
            if (repeatControl) {
                repeatControl.classList.remove("hidden")
            }
        }, 1500)
    }

    /**
     * Toggle the highlighting of a senso action button.
     * @param button The senso's action button whose highlighting will be toggled
     */
    public static toggleHighlighting(button: HTMLElement) {
        const buttonRow = button.closest(".button-row")
        buttonRow?.classList.toggle("selected")
        button.classList.toggle("selected")

        const subtitleLabel = document.getElementById("subtitle")
        if (subtitleLabel) {
            subtitleLabel!.innerHTML = button.ariaLabel
        }
    }

    private static getSensoButtonHighlightDuration(): number {
        let duration = Accessibility.cognitive.sensoButtonHighlightingDuration
        return duration * 1000
    }
}