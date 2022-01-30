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
     * Status whether to show animations or not
     */
    @observable public showAnimations: boolean = true

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
        localStorage.setItem("ui-color-mode", this.uiColorMode)
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
        localStorage.setItem("ui-primary-color", this.primaryColor)
    }

    /**
     * Update the UI contrast mode.
     * @param newContrastMode The new contrast mode to switch to
     */
    @action public setUIContrastMode(newContrastMode: UIContrastMode, skipSettingContrastValue: boolean = false) {

        this.uiContrastMode = newContrastMode
        let contrastValue = 0
        switch (newContrastMode) {
            case UIContrastMode.HighContrast:
                document.documentElement.classList.remove("high-saturation")
                document.documentElement.classList.remove("low-saturation")
                document.documentElement.classList.add("high-contrast")
                this.minContrastValue = 130;
                this.maxContrastValue = 200;
                contrastValue = 135
                break
            case UIContrastMode.HighSaturation:
                document.documentElement.classList.remove("high-contrast")
                document.documentElement.classList.remove("low-saturation")
                document.documentElement.classList.add("high-saturation")
                this.minContrastValue = 150;
                this.maxContrastValue = 250;
                contrastValue = 200
                break
            case UIContrastMode.LowSaturation:
                document.documentElement.classList.remove("high-contrast")
                document.documentElement.classList.remove("high-saturation")
                document.documentElement.classList.add("low-saturation")
                this.minContrastValue = 40;
                this.maxContrastValue = 75;
                contrastValue = 60
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
        localStorage.setItem("ui-contrast-mode", this.uiContrastMode)
        if (!skipSettingContrastValue) {
            this.setContrastValue(contrastValue)
        }
    }

    /**
     * Update the current contrast value.
     * @param newContrastValue The new contrast value which to apply
     */
    @action public setContrastValue(newContrastValue: number) {
        this.contrastValue = newContrastValue
        document.documentElement.style.setProperty("--contrastValue", `${newContrastValue}%`)
        localStorage.setItem("ui-max-contrast-value", `${this.maxContrastValue}`)
        localStorage.setItem("ui-min-contrast-value", `${this.minContrastValue}`)
        localStorage.setItem("ui-contrast-value",`${this.contrastValue}`)
    }

    /**
     * Update status whether to show animations or not
     * @param show The show status
     */
    @action public setShowAnimations(show: boolean) {
        this.showAnimations = show
        localStorage.setItem("ui-show-animation", `${this.showAnimations}`)
    }

    /**
     * Create a new set of seeing / visual related accessibility settings.
     */
    public constructor() {
        makeObservable(this);

        let uiColorMode = localStorage.getItem("ui-color-mode") as UIColorMode
        if (uiColorMode) {
            this.setUIColorMode(uiColorMode)
        } else {
            localStorage.setItem("ui-color-mode", this.uiColorMode)
        }

        let uiContrastMode = localStorage.getItem("ui-contrast-mode") as UIContrastMode
        if (uiContrastMode) {
            this.setUIContrastMode(uiContrastMode, true)
        } else {
            localStorage.setItem("ui-contrast-mode", this.uiContrastMode)
        }

        let uiMinContrastValue = parseInt(localStorage.getItem("ui-min-contrast-value") ?? "0")
        if (uiMinContrastValue !== undefined) {
            this.minContrastValue = uiMinContrastValue
        } else {
            localStorage.setItem("ui-min-contrast-value", `${this.minContrastValue}`)
        }

        let uiMaxContrastValue = parseInt(localStorage.getItem("ui-max-contrast-value") ?? "0")
        if (uiMaxContrastValue !== undefined) {
            this.maxContrastValue = uiMaxContrastValue
        } else {
            localStorage.setItem("ui-max-contrast-value", `${this.maxContrastValue}`)
        }

        let uiContrastValue = parseInt(localStorage.getItem("ui-contrast-value") ?? "0")
        if (uiContrastValue !== undefined) {
            this.setContrastValue(uiContrastValue)
        } else {
            localStorage.setItem("ui-contrast-value", `${this.contrastValue}`)
        }

        let uiPrimaryColor = localStorage.getItem("ui-primary-color")
        if (uiPrimaryColor) {
            this.setPrimaryColor(uiPrimaryColor)
        } else {
            localStorage.setItem("ui-primary-color", this.primaryColor)
        }

        let uiShowAnimations = localStorage.getItem("ui-show-animation")
        if (uiShowAnimations) {
            this.setShowAnimations(uiShowAnimations === "true")
        } else {
            localStorage.setItem("ui-show-animation", `${this.showAnimations}`)
        }
    }

    public resetSettings() {
        this.setUIColorMode(UIColorMode.Light)
        this.setUIContrastMode(UIContrastMode.Normal)
        this.setShowAnimations(true)
        this.setPrimaryColor("#e31e60")
    }
}