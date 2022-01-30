import {action, makeObservable, observable} from "mobx";
import {GameplaySession} from "../../../app/context/SensoGameplayContext";

/**
 * Collection of motor cognitive related accessibility settings.
 */
export class CognitiveAccessibilityProps {

    /**
     * Duration of highlighting a senso button from a randomly generated sequence
     */
    @observable public sensoButtonHighlightingDuration: number = 1
    /**
     * The time a player has to answer the 'next' button from given sequence
     */
    @observable public playerAnswerTime: number = 10

    /**
     * The total number of lives the player has (~ number of allowed failed attempts)
     */
    @observable public playerLives: number = 7

    /**
     * The total number of tips that can be given per level
     */
    @observable public numberOfTips: number = 7

    /**
     * Status whether extreme mode is activated or not
     */
    @observable public isExtremeMode: boolean = false

    /**
     * Update the duration of highlighting a senso button from a randomly generated sequence
     * @param newDuration the new duration
     */
    @action public setSensoButtonHighlightingDuration(newDuration: number) {
        this.sensoButtonHighlightingDuration = newDuration
        localStorage.setItem("cognitive-senso-button-highlight-duration", `${this.sensoButtonHighlightingDuration}`)
    }

    /**
     * Update the time a player has to answer the 'next' button from given sequence
     * @param newAnswerTime the new answer time
     */
    @action setPlayerAnswerTime(newAnswerTime: number) {
        this.playerAnswerTime = newAnswerTime
        localStorage.setItem("cognitive-player-answer-time", `${this.playerAnswerTime}`)
    }

    /**
     * Update the total number of lives the player has (~ number of allowed failed attempts)
     * @param newPlayerLives The new total number of lives
     */
    @action setPlayerLives(newPlayerLives: number) {
        this.playerLives = newPlayerLives
        GameplaySession.updatePlayerLives(newPlayerLives)
        localStorage.setItem("cognitive-player-lives", `${this.playerLives}`)
    }

    /**
     * Update the total number of tips that can be given per level
     * @param newNumberOfTips The new total number of tips
     */
    @action public setNumberOfTips(newNumberOfTips: number) {
        this.numberOfTips = newNumberOfTips
        localStorage.setItem("cognitive-number-of-tips", `${this.numberOfTips}`)
    }

    /**
     * Update the status whether extreme mode is activated or not
     * @param isEnabled The new status
     */
    @action public setExtremeMode(isEnabled: boolean) {
        this.isExtremeMode = isEnabled
        localStorage.setItem("cognitive-is-extreme-mode", `${this.isExtremeMode}`)
    }

    /**
     * Create a new set of cognitive related accessibility settings.
     */
    public constructor() {
        makeObservable(this);

        let sensoButtonHighlightingDuration = parseInt(localStorage.getItem("cognitive-senso-button-highlight-duration") ?? "1")
        if (sensoButtonHighlightingDuration) {
            this.setSensoButtonHighlightingDuration(sensoButtonHighlightingDuration)
        } else {
            localStorage.setItem("cognitive-senso-button-highlight-duration", `${this.sensoButtonHighlightingDuration}`)
        }

        let playerAnswerTime = parseInt(localStorage.getItem("cognitive-player-answer-time") ?? "10")
        if (playerAnswerTime) {
            this.setPlayerAnswerTime(playerAnswerTime)
        } else {
            localStorage.setItem("cognitive-player-answer-time", `${this.playerAnswerTime}`)
        }

        let playerLives = parseInt(localStorage.getItem("cognitive-player-lives") ?? "7")
        if (playerLives) {
            this.setPlayerLives(playerLives)
        } else {
            localStorage.setItem("cognitive-player-lives", `${this.playerLives}`)
        }

        let numberOfTips = parseInt(localStorage.getItem("cognitive-number-of-tips") ?? "7")
        if (numberOfTips) {
            this.setNumberOfTips(numberOfTips)
        } else {
            localStorage.setItem("cognitive-number-of-tips", `${this.numberOfTips}`)
        }

        let isExtremeMode = localStorage.getItem("cognitive-is-extreme-mode")
        if (isExtremeMode) {
            this.setExtremeMode(isExtremeMode === "true")
        } else {
            localStorage.setItem("cognitive-is-extreme-mode", `${this.isExtremeMode}`)
        }
    }
}