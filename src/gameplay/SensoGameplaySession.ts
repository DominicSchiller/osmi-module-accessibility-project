import {SensoButtonID} from "../app/components/Senso/Button/SensoButton.Model";
import {SensoUIHelper} from "./SensoUIHelper";
import {SensoAudioPlayer, SensoSound} from "./SensoAudioPlayer";
import {action, computed, makeObservable, observable} from "mobx";
import LevelScoreManager from "./LevelScoreCalculator";

/**
 * The senso gameplay session
 */
export class SensoGameplaySession {

    /**
     * Status whether a random sequence is playing and presented to the user
     */
    @observable public isPlayingSequence: boolean = true
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
        return this._isLevelCompleted && this._refButtonIndex === this._randomSequence.length
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
     * The player's gained total score
     * @private
     */
    @observable private _playerTotalScore: number = 0

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
    @observable private _isLevelCompleted: boolean = false

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
     * Start new round
     */
    @action public start() {
        if (this._isLevelCompleted) {
            this._playerTotalScore += this.levelScore
        }
        this.setRoundStarted(false)
        this._clickedSequence = []
        this._randomSequence = []
        this.setRefButtonIndex(0)
        this.isPlayingSequence = true
        this.countDown(3)
    }

    /**
     * Generate a new sequence of random picks
     */
    public generateNewSequence() {
        this.setRefButtonIndex(0)
        this._randomSequence = []

       for (let i=0; i<this.level; i++) {
           this._randomSequence.push(SensoGameplaySession.getRandomButton())
       }
    }

    /**
     * Present the random sequence to the user
     */
    public async presentRandomSequence() {
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
        }
        SensoAudioPlayer.play(isCorrectSelection ? SensoSound.CorrectSelection : SensoSound.WrongSelection)

        if (this.isLevelCompleted) {
            this.scoreManager.stopTimer()
        }
        return isCorrectSelection
    }

    /**
     * trigger a countdown starting from given counter.
     * @param counter The counter which will be counted down
     */
    @action private countDown(counter: number) {
        const countdownId = "countdown"
        const subtitleId = "subtitle"

        setTimeout(() => {
            switch (counter) {
                case -1:
                    this.incrementRound()
                    this.generateNewSequence()
                    this.presentRandomSequence().then(() => {
                        this.setSequencePlayingState(false)
                        this.setRoundStarted(true)
                        this.scoreManager.startTimer()
                        document.getElementById(subtitleId)!.innerHTML = "Und jetzt du ..."
                    });
                    break;
                case 0:
                    document.getElementById(countdownId)!.innerHTML = "&nbsp;";
                    this.countDown(-1)
                    break;
                default:
                    document.getElementById(countdownId)!.innerHTML = `${counter}`
                    this.countDown(counter-1)
            }
        }, counter === 3 ? 500 : 1200);
    }

    @action private setSequencePlayingState(isPlaying: boolean) {
        this.isPlayingSequence = isPlaying
    }

    @action private setRoundStarted(isStarted: boolean) {
        this._isLevelCompleted = isStarted
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

