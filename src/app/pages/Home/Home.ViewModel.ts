import {AccessibilityProps} from "../../../models/AccessibilityProps";
import {accessibilityProps} from "../../../models/AccessibilityProps";
import {action, observable, makeObservable} from "mobx";
import React from "react";

/**
 * The Home page's view models.
 */
export default class HomeViewModel {
    @observable public accessibility: AccessibilityProps

    /**
     * Create a new view models instance.
     */
    constructor() {
        makeObservable(this);
        this.accessibility = accessibilityProps
    }

    /**
     * Handles the test button's onClick event.
     * @param {React.MouseEvent<HTMLButtonElement>} event The triggered React mouse event
     */
    @action onTestClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        console.info("Test button clicked");
        this.accessibility.color = "#ff00ff";
    }
}