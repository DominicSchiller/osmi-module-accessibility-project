import {SensoButtonID} from "../app/components/Senso/Button/SensoButton.Model";
import {SensoUIHelper} from "./SensoUIHelper";
import {SensoAudioPlayer, SensoSound} from "./SensoAudioPlayer";

export class SensoGameplaySession {

    /**
     * The globally shared senso gameplay session
     */
    public static readonly shared: SensoGameplaySession = new SensoGameplaySession()

    /**
     * Status whether the gaming session has been started or not
     */
    public get isSessionStarted(): boolean {
        return this._randomSequence.length > 0
    }

    public get isRoundFinished(): boolean {
        return this._refButtonIndex === this._randomSequence.length
    }

    /**
     * The current round
     * note: this property also declares the total number of random button picks
     * @private
     */
    private _round: number = 5
    /**
     * The current sequence of randomly picked buttons
     * @private
     */
    private _randomSequence: SensoButtonID[] = []
    /**
     * The current sequence of buttons selected by the user
     * @private
     */
    private _clickedSequence: SensoButtonID[] = []
    /**
     * The current validation index
     * @private
     */
    private _refButtonIndex: number = 0

    /**
     * The current round
     */
    public get round(): number {
        return this._round;
    }

    /**
     * Create a new Senso gameplay session.
     * @private
     */
    private constructor() {}

    /**
     * Generate a new sequence of random picks
     */
    public generateNewSequence() {
        this._refButtonIndex = 0
        this._randomSequence = []

       for (let i=0; i<this.round; i++) {
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
        if (this.isRoundFinished) {
            return true
        }

        this._clickedSequence.push(clickedButton)
        const refButton = this._randomSequence[this._refButtonIndex];
        const isCorrectSelection = refButton === clickedButton

        if (isCorrectSelection) {
            this._refButtonIndex++;
        }
        SensoAudioPlayer.play(isCorrectSelection ? SensoSound.CorrectSelection : SensoSound.WrongSelection)

        if (this.isRoundFinished) {
            SensoUIHelper.showRoundStatus(this._clickedSequence.length, this._round)
        }

        return isCorrectSelection
    }

    private static getRandomButton(): SensoButtonID {
        const random = Math.floor(Math.random() * Object.keys(SensoButtonID).length);
        return Object.values(SensoButtonID)[random] as SensoButtonID;
    }
}

