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

    /**
     * Create a new view model instance.
     */
    constructor() {
        makeObservable(this);
    }
}