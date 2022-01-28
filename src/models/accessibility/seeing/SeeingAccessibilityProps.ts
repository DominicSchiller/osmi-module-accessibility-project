import {action, makeObservable, observable} from "mobx";
import {UIColorMode} from "./UIColorMode";
import {UIContrastMode} from "./UIContrastMode";
import {fixSensoAspectRatio} from "../../../utils/UIWorkarounds";

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
    @observable primaryColor = "#e31e60"
    /**
     * The font family used to display text content
     */
    @observable fontFamily = "Atkinson-Hyperlegible"

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
                document.documentElement.classList.remove("monochrome")
                break
            case UIColorMode.Monochrome:
                document.documentElement.classList.add("monochrome")
                break
        }
        fixSensoAspectRatio()
    }

    @action public setFontFamily(fontFamily: string) {
        this.fontFamily = fontFamily
    }

    /**
     * Update the primary color used for all interaction components.
     * @param hexString The color's hex string
     */
    @action public setPrimaryColor(hexString: string) {
        this.primaryColor = hexString
        console.warn(hexString)
    }

    /**
     * Update the UI contrast mode.
     * @param newContrastMode The new contrast mode to switch to
     */
    @action public setUIContrastMode(newContrastMode: UIContrastMode) {

        this.uiContrastMode = newContrastMode

        switch (newContrastMode) {
            case UIContrastMode.HighContrast:
                document.documentElement.classList.remove("high-saturation")
                document.documentElement.classList.remove("low-saturation")
                document.documentElement.classList.add("high-contrast")
                this.minContrastValue = 130;
                this.maxContrastValue = 200;
                this.setContrastValue(135)
                break
            case UIContrastMode.HighSaturation:
                document.documentElement.classList.remove("high-contrast")
                document.documentElement.classList.remove("low-saturation")
                document.documentElement.classList.add("high-saturation")
                this.minContrastValue = 150;
                this.maxContrastValue = 250;
                this.setContrastValue(200)
                break
            case UIContrastMode.LowSaturation:
                document.documentElement.classList.remove("high-contrast")
                document.documentElement.classList.remove("high-saturation")
                document.documentElement.classList.add("low-saturation")
                this.minContrastValue = 40;
                this.maxContrastValue = 75;
                this.setContrastValue(60)
                break
            default:
                document.documentElement.classList.remove("high-contrast")
                document.documentElement.classList.remove("high-saturation")
                document.documentElement.classList.remove("low-saturation")
                this.minContrastValue = 0;
                this.maxContrastValue = 0;
                this.setContrastValue(0)
        }
        fixSensoAspectRatio()
    }

    /**
     * Update the current contrast value.
     * @param newContrastValue The new contrast value which to apply
     */
    @action public setContrastValue(newContrastValue: number) {
        this.contrastValue = newContrastValue
        document.documentElement.style.setProperty("--contrastValue", `${newContrastValue}%`)
    }

    /**
     * Create a new set of seeing / visual related accessibility settings.
     */
    public constructor() {
        makeObservable(this);
    }
}