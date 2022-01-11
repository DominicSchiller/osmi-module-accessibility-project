import {SensoButtonID} from "../app/components/Senso/Buttons/SensoButton.Model";
import {UIColorMode} from "../models/accessibility/seeing/UIColorMode";

/**
 * Repository to retrieve colors for senso button components.
 */
export class SensoButtonColorRepository {
    /**
     * The color of the senso's top left action button
     */
    private static readonly topLeftColor = "#c72b00";
    /**
     * The color of the senso's top right action button
     */
    private static readonly topRightColor  = "#ebb800";
    /**
     * The color of the senso's bottom left action button
     */
    private static readonly bottomLeftColor  = "#8dad00";
    /**
     * The color of the senso's bottom right action button
     */
    private static readonly bottomRightColor  = "#09639c";

    /**
     * Create a new repository instance.
     * @private
     */
    private constructor() {
    }

    /**
     * Get a senso button's color.
     * @param buttonID The button identifier for which to retrieve the color
     * @param uiColorMode The currently set UI color mode
     */
    public static getColor(buttonID: SensoButtonID, uiColorMode: UIColorMode): string {
        if (uiColorMode === UIColorMode.Monochrome) {
            return this.topLeftColor
        }

        switch (buttonID) {
            case SensoButtonID.TopLeft:
                return this.topLeftColor
            case SensoButtonID.TopRight:
                return this.topRightColor
            case SensoButtonID.BottomLeft:
                return this.bottomLeftColor
            case SensoButtonID.BottomRight:
                return this.bottomRightColor
        }
    }
}