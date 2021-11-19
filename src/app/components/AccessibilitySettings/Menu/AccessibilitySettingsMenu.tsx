import AccessibilitySettingsMenuViewModel from "./AccessibilitySettingsMenu.ViewModel";
import React, {forwardRef} from "react";
import AccessibilitySettingsMenuView from "./AccessibilitySettingsMenu.View";
import {withAccessibilityMenuContext} from "../../../context/AccessibilityMenuContext";

/**
 * The accessibility settings menu's view model.
 */
const viewModel = new AccessibilitySettingsMenuViewModel();

/**
 * The accessibility menu component
 */
const AccessibilityMenu = forwardRef((props: any, ref: any) => {
    const SettingsMenuView = withAccessibilityMenuContext(() => {
        return <AccessibilitySettingsMenuView viewModel={viewModel} ref={ref} />
    })
    return <SettingsMenuView />
});

export default AccessibilityMenu;