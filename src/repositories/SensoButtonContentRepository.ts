import {SensoButtonID} from "../app/components/Senso/Buttons/SensoButton.Model";
import {GameMode} from "../models/accessibility/motor/GameMode";

/**
 * Repository to retrieve content for senso buttons.
 */
export class SensoButtonContentRepository {

    /**
     * Create a new repository instance.
     * @private
     */
    private constructor() {

    }

    /**
     * Get a senso button's content which to display.
     * @param buttonID The senso button's identifier for which to retrieve the content
     * @param gameMode The currently set game mode
     */
    public static getContent(buttonID: SensoButtonID, gameMode: GameMode): IButtonContent {
        switch (gameMode) {
            case  GameMode.Animals:
                return this.getAnimalContent(buttonID, gameMode)
            case GameMode.Instruments:
                return this.getInstrumentsContent(buttonID, gameMode)
            default:
                return this.getSymbolContent(buttonID, gameMode)
        }
    }

    /**
     * Get a senso button's symbol-related content which to display.
     * @param buttonID The senso button's identifier for which to retrieve the content
     * @param gameMode The currently set game mode
     */
    private static getSymbolContent(buttonID: SensoButtonID, gameMode: GameMode): IButtonContent {
        switch (buttonID) {
            case SensoButtonID.TopLeft:
                return {
                    title: "Wolke",
                    iconPath: `${gameMode}/cloud`,
                    soundFXPath: `${gameMode}/simonSound1.mp3`,
                }
            case SensoButtonID.TopRight:
                return {
                    title: "Mond",
                    iconPath: `${gameMode}/moon`,
                    soundFXPath: "simonSound2.mp3",
                }
            case SensoButtonID.BottomLeft:
                return {
                    title: "Stern",
                    iconPath: `${gameMode}/star`,
                    soundFXPath: `${gameMode}/simonSound3.mp3`,
                }
            case SensoButtonID.BottomRight:
                return {
                    title: "Sonne",
                    iconPath: `${gameMode}/sun`,
                    soundFXPath: `${gameMode}/simonSound4.mp3`,
                }
        }
    }

    /**
     * Get a senso button's animals-related content which to display.
     * @param buttonID The senso button's identifier for which to retrieve the content
     * @param gameMode The currently set game mode
     */
    private static getAnimalContent(buttonID: SensoButtonID, gameMode: GameMode): IButtonContent {
        switch (buttonID) {
            case SensoButtonID.TopLeft:
                return {
                    title: "Huhn",
                    iconPath: `${gameMode}/chicken`,
                    soundFXPath: `${gameMode}/chicken.mp3`,
                }
            case SensoButtonID.TopRight:
                return {
                    title: "Elefant",
                    iconPath: `${gameMode}/elephant`,
                    soundFXPath: `${gameMode}/elephant.mp3`,
                }
            case SensoButtonID.BottomLeft:
                return {
                    title: "Frosch",
                    iconPath: `${gameMode}/frog`,
                    soundFXPath: `${gameMode}/frog.mp3`,
                }
            case SensoButtonID.BottomRight:
                return {
                    title: "Tiger",
                    iconPath: `${gameMode}/tiger`,
                    soundFXPath: `${gameMode}/tiger.mp3`,
                }
        }
    }

    /**
     * Get a senso button's instruments-related content which to display.
     * @param buttonID The senso button's identifier for which to retrieve the content
     * @param gameMode The currently set game mode
     */
    private static getInstrumentsContent(buttonID: SensoButtonID, gameMode: GameMode): IButtonContent {
        switch (buttonID) {
            case SensoButtonID.TopLeft:
                return {
                    title: "Chor",
                    iconPath: `${gameMode}/choir`,
                    soundFXPath: "choir.m4a",
                }
            case SensoButtonID.TopRight:
                return {
                    title: "E-Gitarre",
                    iconPath: `${gameMode}/eguitar`,
                    soundFXPath: `${gameMode}/eguitar.m4a`,
                }
            case SensoButtonID.BottomLeft:
                return {
                    title: "Klavier",
                    iconPath: `${gameMode}/piano`,
                    soundFXPath: `${gameMode}/piano.m4a`,
                }
            case SensoButtonID.BottomRight:
                return {
                    title: "Trompete",
                    iconPath: `${gameMode}/trumpet`,
                    soundFXPath: `${gameMode}/trumpet.m4a`,
                }
        }
    }
}

/**
 * A senso button's content.
 */
export interface IButtonContent {
    /**
     * The title text
     */
    title: string
    /**
     * The icon's file path
     * @note: This path is relative to the assets' image directory.
     */
    iconPath: string
    /**
     * The sound effects' path
     * @note: This path is relative to the assets' sounds directory.
     */
    soundFXPath: string
}