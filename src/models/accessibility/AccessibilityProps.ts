import {makeObservable, observable} from "mobx";
import {SeeingAccessibilityProps} from "./seeing/SeeingAccessibilityProps";
import {HearingAccessibilityProps} from "./hearing/HearingAccessibilityProps";

/**
 * Definition of accessibility related properties
 */
export interface AccessibilityProps {
    /**
     * Collection of seeing / visual related accessibility settings
     */
    seeing: SeeingAccessibilityProps
    /**
     * Collection of hearing related accessibility settings
     */
    hearing: HearingAccessibilityProps
}

/**
 * Default set of accessibility properties
 */
export class AccessibilityProps implements AccessibilityProps {

    @observable seeing: SeeingAccessibilityProps = new SeeingAccessibilityProps()

    @observable hearing: HearingAccessibilityProps = new HearingAccessibilityProps()

    /**
     * Create a new view model instance.
     */
    constructor() {
        makeObservable(this);
    }
}

