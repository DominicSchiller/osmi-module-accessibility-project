import {Backdrop, Box, Drawer} from "@mui/material";
import AccessibilityCategoriesOverview from "../Settings/AccessibilityCategoriesOverview";
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import AccessibilitySettingsMenuViewModel from "./AccessibilitySettingsMenu.ViewModel";
import {observer} from "mobx-react";
import "./AccessibilitySettingsMenu.scss"
import {AccessibilitySettingsCategory} from "../../../../models/AccessibilitySettingsCategory";
import AccessibilityHearingSettings from "../Settings/AccessibilityHearingSettings";
import AccessibilitySeeingSettings from "../Settings/AccessibilitySeeingSettings";
import AccessibilityMotorActivitySettings from "../Settings/AccessibilityMotorActivitySettings";
import AccessibilityCognitiveSettings from "../Settings/AccessibilityCognitiveSettings";
import {AccessibilityMenuContextProvider} from "../../../context/AccessibilityMenuContext";

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

    useEffect(() => {
        const handleKeyUp = (e: any) => {
            console.log(e);
        }
        window.document.addEventListener('keyup', viewModel.handleKeyUp);
        return () => {
            window.document.removeEventListener('keyup', handleKeyUp);
        }
    });

    return(
        <aside>
            <Backdrop
                id={"menuBackdrop"}
                open={viewModel.isMenuOpen}
                onClick={viewModel.toggleMenu}
             />
            <Drawer
                id={"accessibilityMenu"}
                variant="persistent"
                anchor={"right"}
                open={viewModel.isMenuOpen}
                onClose={viewModel.toggleMenu}
                PaperProps={{
                    sx: {
                        backgroundColor: '#ffffff',
                        boxShadow: "0 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)"
                    }
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: "transparent",
                        color: "red",
                    }
                }}>
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
                                    return <AccessibilityCategoriesOverview />
                            }
                        })()}
                    </AccessibilityMenuContextProvider>
                </Box>
            </Drawer>
        </aside>
    );
});

export default observer(AccessibilitySettingsMenuView)