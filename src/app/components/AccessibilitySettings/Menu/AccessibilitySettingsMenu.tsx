import AccessibilitySettingsMenuViewModel from "./AccessibilitySettingsMenu.ViewModel";
import React, {forwardRef} from "react";
import AccessibilitySettingsMenuView from "./AccessibilitySettingsMenu.View";

/**
 * The accessibility menu component
 */
const AccessibilityMenu = forwardRef((props, ref) => {
    const viewModel = new AccessibilitySettingsMenuViewModel();
    return <AccessibilitySettingsMenuView viewModel={viewModel} ref={ref} />
});

export default AccessibilityMenu;