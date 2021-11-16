import {Box, Drawer} from "@mui/material";
import AccessibilitySettingsCategoriesOverview from "../settings/AccessibilitySettingsCategoriesOverview";
import React, {forwardRef, useImperativeHandle} from "react";
import AccessibilitySettingsMenuViewModel from "./AccessibilitySettingsMenu.ViewModel";
import {observer} from "mobx-react";
import "./AccessibilitySettingsMenu.scss"
import {AccessibilitySettingsCategory} from "../../../../models/AccessibilitySettingsCategory";
import {AccessibilityMenuContextProvider} from "./AccessibilityMenuContext";
import AccessibilityHearingSettings from "../settings/AccessibilityHearingSettings";
import AccessibilitySeeingSettings from "../settings/AccessibilitySeeingSettings";
import AccessibilityMotorActivitySettings from "../settings/AccessibilityMotorActivitySettings";
import AccessibilityCognitiveSettings from "../settings/AccessibilityCognitiveSettings";

/**
 * Collection of props used by the accessibility menu component.
 */
export interface AccessibilitySettingsMenuProps {
    /**
     * The accessibility menu's view model
     */
    viewModel: AccessibilitySettingsMenuViewModel
}

/**
 * The accessibility menu's view component
 */
const AccessibilitySettingsMenuView = forwardRef(({viewModel}: AccessibilitySettingsMenuProps, ref: any) => {

    useImperativeHandle(ref, () => ({
        toggleMenu: viewModel.toggleMenu
    }))

    return(
        <aside>
            <Drawer
                variant="temporary"
                anchor={"top"}
                open={viewModel.isMenuOpen}
                onClose={viewModel.toggleMenu}
                onKeyUp={viewModel.handleKeyUp}>
                <Box className={"menuContainer"} role="presentation">
                    <AccessibilityMenuContextProvider menuContext={viewModel}>
                        {(() => {
                            switch (viewModel.selectedCategory) {
                                case AccessibilitySettingsCategory.Hearing:
                                    return <AccessibilityHearingSettings onKey />
                                case AccessibilitySettingsCategory.Seeing:
                                    return <AccessibilitySeeingSettings />
                                case AccessibilitySettingsCategory.MotorActivity:
                                    return <AccessibilityMotorActivitySettings />
                                case AccessibilitySettingsCategory.Cognitive:
                                    return <AccessibilityCognitiveSettings />
                                default:
                                    return <AccessibilitySettingsCategoriesOverview />
                            }
                        })()}
                    </AccessibilityMenuContextProvider>
                </Box>
            </Drawer>
        </aside>
    );
});

export default observer(AccessibilitySettingsMenuView)