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
     * Status whether to show the remaining number of tips or not
     */
    @observable public showNumberOfTips: boolean = true

    /**
     * Status whether to show or hide the player's remaining lives
     */
    @observable public showPlayerLives: boolean = true

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
        localStorage.setItem("motor-game-mode", this.gameMode)
    }

    /**
     * Update status of showing the gained total score
     * @param show new the show status
     */
    @action public setShowTotalScore(show: boolean) {
        this.showTotalScore = show
        localStorage.setItem("motor-show-total-score", `${this.showTotalScore}`)
    }

    /**
     * Update status of showing the player's remaining lives
     * @param show new the show status
     */
    @action public setShowPlayerLives(show: boolean) {
        this.showPlayerLives = show
        localStorage.setItem("motor-show-player-lives", `${this.showPlayerLives}`)
    }

    /**
     * Update the Status whether to show the remaining number of tips or not
     * @param show new the show status
     */
    @action public setShowNumberOfTips(show: boolean) {
        this.showNumberOfTips = show
        localStorage.setItem("motor-show-number-of-tips", `${this.showNumberOfTips}`)
    }

    /**
     * Update the level's countdown duration
     * @param newDuration the new duration
     */
    @action public setLevelCountdownDuration(newDuration: number) {
        this.levelCountdownDuration = newDuration
        localStorage.setItem("motor-level-countdown-duration", `${this.levelCountdownDuration}`)
    }

    /**
     * Create a new set of motor activity related accessibility settings.
     */
    public constructor() {
        makeObservable(this);

        let gameMode = localStorage.getItem("motor-game-mode") as GameMode
        if (gameMode) {
            this.setGameMode(gameMode)
        } else {
            localStorage.setItem("motor-game-mode", this.gameMode)
        }

        let showTotalScore = localStorage.getItem("motor-show-total-score")
        if (showTotalScore) {
            this.setShowTotalScore(showTotalScore === "true")
        } else {
            localStorage.setItem("motor-show-total-score", `${this.showTotalScore}`)
        }

        let showPlayerLives = localStorage.getItem("motor-show-player-lives")
        if (showPlayerLives) {
            this.setShowPlayerLives(showPlayerLives === "true")
        } else {
            localStorage.setItem("motor-show-player-lives", `${this.showPlayerLives}`)
        }

        let showNumberOfTips = localStorage.getItem("motor-show-number-of-tips")
        if (showNumberOfTips) {
            this.setShowNumberOfTips(showNumberOfTips === "true")
        } else {
            localStorage.setItem("motor-show-number-of-tips", `${this.showNumberOfTips}`)
        }

        let levelCountdownDuration = parseInt(localStorage.getItem("motor-level-countdown-duration") ?? "3")
        if (levelCountdownDuration !== undefined) {
            this.setLevelCountdownDuration(levelCountdownDuration)
        } else {
            localStorage.setItem("motor-level-countdown-duration", `${this.levelCountdownDuration}`)
        }
    }

    public resetSettings() {
        this.setGameMode(GameMode.Animals)
        this.setShowNumberOfTips(true)
        this.setShowPlayerLives(true)
        this.setShowTotalScore(true)
        this.setLevelCountdownDuration(3)
    }

}