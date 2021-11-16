import React from "react";
import {Icon, IconButton} from "@mui/material";
import {withAccessibilityMenuContext} from "../Menu/AccessibilityMenuContext";

const AccessibilityMotorActivitySettings = withAccessibilityMenuContext((props: any) => {
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
            <h2>Motorik</h2>
            <p>Motor activity settings will be available soon :-)</p>
        </div>
    );
});

export default AccessibilityMotorActivitySettings;