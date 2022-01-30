import {makeObservable, observable} from "mobx";
import {SeeingAccessibilityProps} from "./seeing/SeeingAccessibilityProps";
import {HearingAccessibilityProps} from "./hearing/HearingAccessibilityProps";
import {MotorActivityAccessibilityProps} from "./motor/MotorActivityAccessibilityProps";
import {CognitiveAccessibilityProps} from "./cognitive/CognitiveAccessibilityProps";

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
    /**
     * Collection of motor activity related accessibility settings
     */
    motor: MotorActivityAccessibilityProps
    /**
     * Collection of motor cognitive related accessibility settings
     */
    cognitive: CognitiveAccessibilityProps
}

/**
 * Default set of accessibility properties
 */
export class AccessibilityProps implements AccessibilityProps {

    @observable seeing: SeeingAccessibilityProps = new SeeingAccessibilityProps()

    @observable hearing: HearingAccessibilityProps = new HearingAccessibilityProps()

    @observable motor: MotorActivityAccessibilityProps = new MotorActivityAccessibilityProps()

    @observable cognitive: CognitiveAccessibilityProps = new CognitiveAccessibilityProps()

    /**
     * Create a new view model instance.
     */
    constructor() {
        makeObservable(this);
    }

    public resetAllSettings() {
        this.seeing.resetSettings()
        this.hearing.resetSettings()
        this.motor.resetSettings()
        this.cognitive.resetSettings()
    }
}

