import {SensoButtonID} from "../app/components/Senso/Buttons/SensoButton.Model";
import {SensoUIHelper} from "./SensoUIHelper";
import {SensoAudioPlayer, SensoSound} from "./SensoAudioPlayer";
import {action, computed, makeObservable, observable} from "mobx";
import LevelScoreManager from "./LevelScoreCalculator";
import {wait} from "../utils/AsyncUtils";

/**
 * The senso gameplay session
 */
export class SensoGameplaySession {

    /**
     * Status whether a random sequence is playing and presented to the user
     */
    @observable public isPlayingSequence: boolean = true
    /**
     * Status the initial countdown app is counting down or not
     */
    @observable public isCountingDown: boolean = true

    /**
     * The current level
     */
    @computed public get level(): number {
        return this._level;
    }

    /**
     * Status whether the current level has been completed or not
     */
    @computed public get isLevelCompleted(): boolean {
        return this.isLevelStarted && this._refButtonIndex === this._randomSequence.length
    }
    /**
     * The total number of required attempts to solve the sequence
     */
    @computed public get attempts(): number {
        return this._clickedSequence.length
    }

    /**
     * The player's gained total score
     */
    @computed public get playerTotalScore(): number {
        return this._playerTotalScore
    }

    /**
     * The player's remaining life
     */
    @computed public get playerLife(): number {
        return this._playerLife
    }


    /**
     * The player's gained total score
     * @private
     */
    @observable private _playerTotalScore: number = 0

    /**
     * The player's remaining life
     * @private
     */
    @observable private _playerLife: number = 3

    /**
     * The current level
     * note: this property also declares the total number of random button picks
     * @private
     */
   @observable private _level: number = 0
    /**
     * The current sequence of randomly picked buttons
     * @private
     */
    @observable private _randomSequence: SensoButtonID[] = []
    /**
     * The current sequence of buttons selected by the user
     * @private
     */
    @observable private _clickedSequence: SensoButtonID[] = []
    /**
     * The current validation index
     * @private
     */
    @observable private _refButtonIndex: number = 0
    /**
     * Status whether the current level has been completed or not
     * @private
     */
    @observable public isLevelStarted: boolean = false

    /**
     * The time needed to complete the current level
     */
    public get levelCompletionTime(): number {
        return this.scoreManager.timeNeeded
    }

    /**
     * The reached score of the currently completed level
     */
    public get levelScore(): number {
        return this.scoreManager.calcScore(this._level)
    }

    /**
     * The current level's score to reach all three stars
     */
    public get threeStarLevelScore(): number {
        return this.scoreManager.calcThreeStarScore(this.level)
    }

    /**
     * The session's game score manager
     * @private
     */
    private scoreManager: LevelScoreManager = new LevelScoreManager()
    /**
     * Create a new Senso gameplay session.
     * @private
     */
    constructor() {
        makeObservable(this);
    }

    /**
     * Start new round.
     */
    @action public async start() {
        if (this.isLevelStarted) {
            this._playerTotalScore += this.levelScore
        }
        this.isCountingDown = true
        this.isLevelStarted = false
        this._clickedSequence = []
        this._randomSequence = []
        this.setIsPlayingSequence(true)
        this.setRefButtonIndex(0)

        await wait(250)
        await this.countDown(3)

        this.incrementRound()
        this.generateNewSequence()
        this.presentRandomSequence().then(() => {
            this.setLevelStarted(true)
            this.setIsPlayingSequence(false)
            this.scoreManager.startTimer()
            const subtitleLabel = document.getElementById("subtitle")
            if (subtitleLabel) {
                subtitleLabel!.innerHTML = "Und jetzt du ..."
            }
        });
    }

    /**
     * Replay the random sequence.
     */
    @action public async replaySequence() {
        if (!this.isLevelStarted) { return }

        this.scoreManager.pauseTimer()
        this.setIsPlayingSequence(true)
        setTimeout(() => {
            this.presentRandomSequence().then(() => {
                this.setIsPlayingSequence(false)
                this.scoreManager.resumeTimer()
            })
        }, 125)
    }

    /**
     * Generate a new sequence of random picks
     */
    private generateNewSequence() {
        this.setRefButtonIndex(0)
        this._randomSequence = []

       for (let i=0; i<this.level; i++) {
           this._randomSequence.push(SensoGameplaySession.getRandomButton())
       }
    }

    /**
     * Present the random sequence to the user
     */
    private async presentRandomSequence() {
        for (const buttonID of this._randomSequence) {
            await SensoUIHelper.highlightButton(buttonID)
        }
    }

    /**
     * Check if a clicked button matches the randomly picked one at given order
     * @param clickedButton The clicked button which to evaluate against the randomly picked one
     */
    public isCorrectSelection(clickedButton: SensoButtonID): boolean {
        if (this.isLevelCompleted) {
            return true
        }

        this._clickedSequence.push(clickedButton)
        const refButton = this._randomSequence[this._refButtonIndex];
        const isCorrectSelection = refButton === clickedButton

        if (isCorrectSelection) {
            this.setRefButtonIndex(this._refButtonIndex+1);
        } else {
            this._playerLife -= this._playerLife > 0 ? 1 : 0
        }
        SensoAudioPlayer.play(isCorrectSelection ? SensoSound.CorrectSelection : SensoSound.WrongSelection)

        if (this.isLevelCompleted) {
            this.scoreManager.stopTimer()
            SensoAudioPlayer.play(SensoSound.LevelCompleted)
        }
        return isCorrectSelection
    }

    /**
     * trigger a countdown starting from given counter.
     * @param steps The steps from which the timer will be counted down
     */
    @action private async countDown(steps: number) {
        const countdownId = "countdown"
        this.isCountingDown = true
        for (let counter=steps; counter>0; counter--) {
            document.getElementById(countdownId)!.innerHTML = `${counter}`
            SensoAudioPlayer.play(SensoSound.Countdown)
            await wait(1200)
        }
        SensoAudioPlayer.play(SensoSound.LevelStarted)
        document.getElementById(countdownId)!.innerHTML = ""
        await wait(1400)
        this.isCountingDown = false
    }

    @action private setIsPlayingSequence(isPlaying: boolean) {
        this.isPlayingSequence = isPlaying
    }

    @action private setLevelStarted(isStarted: boolean) {
        this.isLevelStarted = isStarted
    }

    @action private incrementRound() {
        this._level += 1
    }

    @action private setRefButtonIndex(index: number) {
        this._refButtonIndex = index
    }

    /**
     * Generate a random button
     * @private
     */
    private static getRandomButton(): SensoButtonID {
        const random = Math.floor(Math.random() * Object.keys(SensoButtonID).length);
        return Object.values(SensoButtonID)[random] as SensoButtonID;
    }
}

