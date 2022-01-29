import {SensoButtonID} from "../app/components/Senso/Buttons/SensoButton.Model";
import {SensoUIHelper} from "./SensoUIHelper";
import {SensoAudioPlayer, SensoSound} from "./SensoAudioPlayer";
import {action, computed, makeObservable, observable} from "mobx";
import LevelScoreManager from "./LevelScoreCalculator";
import {wait} from "../utils/AsyncUtils";
import {Accessibility} from "../app/context/AccessibilityContext";

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
     * Status whether the extreme mode is set or ot
     */
    @observable public isExtremeMode: boolean = false

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

    @computed public get numberOfTips(): number {
        let maxTips = Accessibility.cognitive.numberOfTips
        return maxTips - this.takenTips
    }

    public nextTip(): string[] {
        if (this._randomSequence.length === 0 || this._randomSequence.length === this._refButtonIndex) {
            return []
        }
        let nextButtonID = this._randomSequence[this._refButtonIndex]
        let buttonLocation = ""

        switch (nextButtonID) {
            case SensoButtonID.TopLeft:
                buttonLocation = "(oben links)"
                break
            case SensoButtonID.TopRight:
                buttonLocation = "(oben rechts)"
                break
            case SensoButtonID.BottomLeft:
                buttonLocation = "(unten links)"
                break
            case SensoButtonID.BottomRight:
                buttonLocation = "(unten rechts)"
                break
        }

        let button = document.getElementById(nextButtonID)
        return [`${button?.ariaLabel ?? ""}`, buttonLocation]
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
    @observable private _playerLife: number = 5

    /**
     * Sum of already lost player lives
     * @private
     */
    @observable private lostPlayerLives: number = 0

    /**
     * Sum of already taken tips
     * @private
     */
    @observable private takenTips: number = 0

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
        if (this.isExtremeMode) {
            this.resetRandomSequence()
        }
        this.setIsPlayingSequence(true)
        this.setRefButtonIndex(0)

        await wait(250)
        await this.countDown(Accessibility.motor.levelCountdownDuration)

        this.incrementRound()
        this.generateNewSequence()
        this.presentRandomSequence().then(() => {
            this.setLevelStarted(true)
            this.setIsPlayingSequence(false)
            this.scoreManager.startTimer()
            const subtitleLabel = document.getElementById("subtitle")
            if (subtitleLabel) {
                subtitleLabel!.innerHTML = ""
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

        if (this.isExtremeMode) {
            this.resetRandomSequence()
            for (let i=0; i<this.level; i++) {
                this.addToRandomSequence(SensoGameplaySession.getRandomButton())
            }
        } else {
            this.addToRandomSequence(SensoGameplaySession.getRandomButton())
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
            this.recalcPlayerLives()
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

    @action public updatePlayerLives(newPlayerLives: number) {
        let newLives = newPlayerLives - this.lostPlayerLives
        this._playerLife = newLives >= 0 ? newLives : 0
    }

    @action public incrementTakenTips() {
        let maxNumberOfTips = Accessibility.cognitive.numberOfTips
        if (maxNumberOfTips !== 0 && maxNumberOfTips !== 7) {
            this.takenTips++
        }
    }

    @action private resetRandomSequence() {
        this._randomSequence = []
    }

    @action private addToRandomSequence(buttonID: SensoButtonID) {
        this._randomSequence.push(buttonID)
    }

    @action private decrementPlayerLife() {
        this._playerLife -= this._playerLife > 0 ? 1 : 0
    }

    private recalcPlayerLives(wasWrongDecision: boolean = true) {
       if (wasWrongDecision && Accessibility.cognitive.playerLives !== 7) {
           this.decrementPlayerLife()
           this.lostPlayerLives++;
       }
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

