import {action, makeObservable, observable} from "mobx";
import {UIColorMode} from "./UIColorMode";

/**
 * Collection of seeing / visual related accessibility settings.
 */
export class SeeingAccessibilityProps {
    /**
     * The current UI color mode
     */
    @observable public uiColorMode: UIColorMode = UIColorMode.Light
    /**
     * The primary color for all interactive controls
     */
    @observable primaryColor = "#e91e63"
    /**
     * The font family used to display text content
     */
    @observable fontFamily = "Atkinson-Hyperlegible"

    /**
     * The color of the senso's top left action button
     */
    @observable sensoTopLeftActionButtonColor = "#ebb800";
    /**
     * The color of the senso's top right action button
     */
    @observable sensoTopRightActionButtonColor = "#c72b00";
    /**
     * The color of the senso's bottom left action button
     */
    @observable sensoBottomLeftActionButtonColor = "#8dad00";
    /**
     * The color of the senso's bottom right action button
     */
    @observable sensoBottomRightActionButtonColor = "#09639c";

    /**
     * Update the color mode
     * @param newColorMode The new color mode to switch to
     */
    @action public setUIColorMode(newColorMode: UIColorMode) {
        this.uiColorMode = newColorMode

        switch (newColorMode) {
            case UIColorMode.Light:
            case UIColorMode.Dark:
                document.body.classList.remove("monochrome")
                break
            case UIColorMode.Monochrome:
                document.body.classList.add("monochrome")
                break
        }
    }

    /**
     * Create a new set of seeing / visual related accessibility settings.
     */
    public constructor() {
        makeObservable(this);
    }
}