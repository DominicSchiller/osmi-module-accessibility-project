import {action, makeObservable, observable} from "mobx";
import {UIColorMode} from "./seeing/SeeingAccessibilityProps";

/**
 * Definition of accessibility related properties
 */
export interface AccessibilityProps {
    uiColorMode: UIColorMode
    primaryColor: string
    fontFamily: string
}

/**
 * Default set of accessibility properties
 */
export class AccessibilityProps implements AccessibilityProps {

    // The current UI color mode
    @observable public uiColorMode: UIColorMode = UIColorMode.Light

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

    @observable primaryColor = "#e91e63"
    @observable fontFamily = "Atkinson-Hyperlegible"

    @observable sensoTopLeftActionButtonColor = "#ebb800";
    @observable sensoTopRightActionButtonColor = "#c72b00";
    @observable sensoBottomLeftActionButtonColor = "#8dad00";
    @observable sensoBottomRightActionButtonColor = "#09639c";

    /**
     * Create a new view model instance.
     */
    constructor() {
        makeObservable(this);
    }
}

