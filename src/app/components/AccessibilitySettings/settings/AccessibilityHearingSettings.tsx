import React from "react";
import {Icon, IconButton} from "@mui/material";
import {withAccessibilityMenuContext} from "../Menu/AccessibilityMenuContext";

const AccessibilityHearingSettings = withAccessibilityMenuContext((props: any) => {
    const {menuContext} = props
    return(
        <div>
            <IconButton
                aria-label="Zurück zum Einstellungen Menü"
                sx={{backgroundColor: "#f2f2f2", color: 'black'}}
                onClick={() => { menuContext.updateSelectedCategory() }}>
                <Icon baseClassName="material-icons-round">
                    arrow_back
                </Icon>
            </IconButton>
            <h2>Hören</h2>
            <p>Hearing settings will be available soon :-)</p>
        </div>
    );
});

export default AccessibilityHearingSettings;