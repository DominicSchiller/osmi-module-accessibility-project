import {makeObservable, observable} from "mobx";

/**
 * Definition of accessibility related properties
 */
export interface AccessibilityProps {
    primaryColor: string
    fontFamily: string
}

/**
 * Default set of accessibility properties
 */
export class AccessibilityProps implements AccessibilityProps {

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