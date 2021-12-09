import {action, makeObservable, observable} from "mobx";
import {UIColorMode} from "./UIColorMode";
import {UIContrastMode} from "./UIContrastMode";

/**
 * Collection of seeing / visual related accessibility settings.
 */
export class SeeingAccessibilityProps {
    /**
     * The current UI color mode
     */
    @observable public uiColorMode: UIColorMode = UIColorMode.Light
    /**
     * The current UI contrast mode
     */
    @observable public uiContrastMode: UIContrastMode = UIContrastMode.Normal

    /**
     * The minimum contrast value that can be set
     */
    @observable public minContrastValue: number = 0
    /**
     * The maximum contrast value that can be set
     */
    @observable public maxContrastValue: number = 0
    /**
     * the currently applied contrast value
     */
    @observable public contrastValue: number = 0

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
    @observable sensoTopLeftActionButtonColor = "#c72b00";
    /**
     * The color of the senso's top right action button
     */
    @observable sensoTopRightActionButtonColor = "#ebb800";
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
        if (!newColorMode || newColorMode === this.uiColorMode) {
            return
        }
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
     * Update the UI contrast mode.
     * @param newContrastMode The new contrast mode to switch to
     */
    @action public setUIContrastMode(newContrastMode: UIContrastMode) {

        this.uiContrastMode = newContrastMode

        switch (newContrastMode) {
            case UIContrastMode.HighContrast:
                document.body.classList.remove("high-saturation")
                document.body.classList.remove("low-saturation")
                document.body.classList.add("high-contrast")
                this.minContrastValue = 130;
                this.maxContrastValue = 200;
                this.setContrastValue(135)
                break
            case UIContrastMode.HighSaturation:
                document.body.classList.remove("high-contrast")
                document.body.classList.remove("low-saturation")
                document.body.classList.add("high-saturation")
                this.minContrastValue = 150;
                this.maxContrastValue = 250;
                this.setContrastValue(200)
                break
            case UIContrastMode.LowSaturation:
                document.body.classList.remove("high-contrast")
                document.body.classList.remove("high-saturation")
                document.body.classList.add("low-saturation")
                this.minContrastValue = 40;
                this.maxContrastValue = 75;
                this.setContrastValue(60)
                break
            default:
                document.body.classList.remove("high-contrast")
                document.body.classList.remove("high-saturation")
                document.body.classList.remove("low-saturation")
                this.minContrastValue = 0;
                this.maxContrastValue = 0;
                this.setContrastValue(0)
        }
    }

    /**
     * Update the current contrast value.
     * @param newContrastValue The new contrast value which to apply
     */
    @action public setContrastValue(newContrastValue: number) {
        this.contrastValue = newContrastValue
        document.body.style.setProperty("--contrastValue", `${newContrastValue}%`)
    }

    /**
     * Create a new set of seeing / visual related accessibility settings.
     */
    public constructor() {
        makeObservable(this);
    }
}