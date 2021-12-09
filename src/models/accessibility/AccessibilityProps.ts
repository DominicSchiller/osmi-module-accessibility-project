import {makeObservable, observable} from "mobx";
import {SeeingAccessibilityProps} from "./seeing/SeeingAccessibilityProps";

/**
 * Definition of accessibility related properties
 */
export interface AccessibilityProps {
    /**
     * Collection of seeing / visual related accessibility settings
     */
    seeing: SeeingAccessibilityProps
}

/**
 * Default set of accessibility properties
 */
export class AccessibilityProps implements AccessibilityProps {

    @observable seeing: SeeingAccessibilityProps = new SeeingAccessibilityProps()

    /**
     * Create a new view model instance.
     */
    constructor() {
        makeObservable(this);
    }
}

