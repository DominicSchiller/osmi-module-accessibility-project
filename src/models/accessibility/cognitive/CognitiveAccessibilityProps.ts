import {action, makeObservable, observable} from "mobx";

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
    @observable public playerLives: number = 5

    /**
     * The total number of tips that can be given per level
     */
    @observable public numberOfTips: number = 0

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
    }

    /**
     * Update the time a player has to answer the 'next' button from given sequence
     * @param newAnswerTime the new answer time
     */
    @action setPlayerAnswerTime(newAnswerTime: number) {
        this.playerAnswerTime = newAnswerTime
    }

    /**
     * Update the total number of lives the player has (~ number of allowed failed attempts)
     * @param newPlayerLives The new total number of lives
     */
    @action setPlayerLives(newPlayerLives: number) {
        this.playerLives = newPlayerLives
    }

    /**
     * Update the total number of tips that can be given per level
     * @param newNumberOfTips The new total number of tips
     */
    @action public setNumberOfTips(newNumberOfTips: number) {
        this.numberOfTips = newNumberOfTips
    }

    /**
     * Update the status whether extreme mode is activated or not
     * @param isEnabled The new status
     */
    @action public setExtremeMode(isEnabled: boolean) {
        this.isExtremeMode = isEnabled
    }

    /**
     * Create a new set of cognitive related accessibility settings.
     */
    public constructor() {
        makeObservable(this);
    }
}