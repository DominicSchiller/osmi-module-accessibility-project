import {action, makeObservable, observable} from "mobx";
import {GameMode} from "./GameMode";

/**
 * Collection of motor activity related accessibility settings.
 */
export class MotorActivityAccessibilityProps {

    /**
     * The current game's mode
     */
    @observable public gameMode: GameMode = GameMode.Animals

    /**
     * Status whether to show better recognizable icons
     */
    @observable public showBetterRecognizableIcons: boolean = true

    /**
     * Status whether to show the gained total score
     */
    @observable public showTotalScore: boolean = true

    /**
     * The level's starting countdown duration
     */
    @observable public levelCountdownDuration = 3

    /**
     * Update the game mode.
     * @param newGameMode The new game mode
     */
    @action public setGameMode(newGameMode: GameMode) {
        this.gameMode = newGameMode
    }

    /**
     * Update status of showing better recognizable icons.
     * @param show new the show status
     */
    @action public setShowBetterRecognizableIcons(show: boolean) {
        this.showBetterRecognizableIcons = show
    }

    /**
     * Update status of showing the gained total score
     * @param show new the show status
     */
    @action public setShowTotalScore(show: boolean) {
        this.showTotalScore = show
    }

    /**
     * Update the level's countdown duration
     * @param newDuration the new duration
     */
    @action public setLevelCountdownDuration(newDuration: number) {
        this.levelCountdownDuration = newDuration
    }

    /**
     * Create a new set of motor activity related accessibility settings.
     */
    public constructor() {
        makeObservable(this);
    }

}