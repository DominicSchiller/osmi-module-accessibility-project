import React from "react";
import {
    Breadcrumbs,
    Divider,
    Icon,
    IconButton, Link,
    Stack,
    Typography
} from "@mui/material";
import {withAccessibilityMenuContext} from "../../../context/AccessibilityMenuContext";
import {withAccessibilityContext} from "../../../context/AccessibilityContext";
import "./AccessibilityCategorySettings.scss";


const AccessibilityMotorActivitySettings = withAccessibilityContext(withAccessibilityMenuContext((props: any) => {
    const {menuContext} = props;
    // const {accessibilityContext} = props;

    return(
        <Stack direction={"column"} className={"seeing-contentContainer"}>
            <header>
                <Stack direction={"row"} alignItems={"center"}>
                    <IconButton
                        aria-label="Zurück zum Einstellungen Menü"
                        sx={{backgroundColor: "#f2f2f2", color: 'black', marginRight: "8px"}}
                        onClick={() => { menuContext.updateSelectedCategory() }}>
                        <Icon baseClassName="material-icons-round">
                            arrow_back
                        </Icon>
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb" separator={
                        <>
                            <Icon baseClassName="material-icons-round" sx={{fontSize: "16px"}}>
                                arrow_forward_ios
                            </Icon>
                        </>
                    }>
                        <Link underline="hover" color="inherit" href={"#"}
                              onClick={() => { menuContext.updateSelectedCategory() }}>
                            Einstellungen Barrierefreiheit
                        </Link>
                        <Typography color="primary" sx={{fontWeight: "700"}}>
                            Motorik
                        </Typography>
                    </Breadcrumbs>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} className={"headline"}>
                    <Icon baseClassName="material-icons-round" className={"icon"}>
                        touch_app
                    </Icon>
                    <Typography variant={"h5"}>
                        Motorik
                    </Typography>
                </Stack>
            </header>
            <Divider />
            <main>
               Einstellungen werden hier bald verfügbar sein.
            </main>
        </Stack>
    );
}));

export default AccessibilityMotorActivitySettings;