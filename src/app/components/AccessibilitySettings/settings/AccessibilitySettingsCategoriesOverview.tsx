import React from "react";
import {Box, Button as MUIButton, Icon, Typography} from "@mui/material";
import {styled} from "@mui/system";
import "./AccessibilitySettingsCategoriesOverview.scss";
import {AccessibilitySettingsCategory} from "../../../../models/AccessibilitySettingsCategory";
import {observer} from "mobx-react";
import {withAccessibilityMenuContext} from "../Menu/AccessibilityMenuContext";

/**
 * Custom styled accessibility category button.
 */
const StyledAccessibilityCategoryButton = styled(MUIButton)`
  color: black;
  background-color: white;
  height: 160px;
  width: 160px;
  flex-direction: column;
  span {
    margin: 4px 0;
    font-size: 36px !important;
  }
`

/**
 * Custom button to visualize accessibility categories.
 * @param props Properties objects
 * @constructor Create a new button instance
 */
const AccessibilityCategoryButton = (props: any) => {
    return(
        <StyledAccessibilityCategoryButton
            variant="outlined"
            startIcon={<Icon baseClassName="material-icons-round">{props.icon}</Icon>}
            sx={{margin: '16px 8px', p: 0}}
            onClick={props.onClick}>
            {props.title}
        </StyledAccessibilityCategoryButton>
    );
}

/**
 * Component to give an overview of accessibility categories to choose from.
 * @constructor Create new instance
 */
const AccessibilitySettingsCategoriesOverview = withAccessibilityMenuContext((props: any) => {
    const {menuContext} = props

    const categories = [
        { title: "Sehen", icon: "visibility", category: AccessibilitySettingsCategory.Seeing },
        { title: "Motorik", icon: "touch_app", category: AccessibilitySettingsCategory.MotorActivity},
        { title: "Hören", icon: "hearing", category: AccessibilitySettingsCategory.Hearing },
        { title: "Kognitiv", icon: "psychology", category: AccessibilitySettingsCategory.Cognitive },
    ];

    return(
        <Box className={"contentContainer"}>
            <header>
                <Icon baseClassName="material-icons-round" className={"headerIcon"}>
                    accessibility_new
                </Icon>
                <Typography variant={"h5"}>
                    Einstellungen der Barrierefreiheit
                </Typography>
            </header>
            <main>
                <nav>
                    {
                        categories.map((props) =>
                            (<AccessibilityCategoryButton
                                key={props.title}
                                onClick={() => {
                                    menuContext.updateSelectedCategory(props.category);
                                }}
                                {...props} />))
                    }
                </nav>
            </main>
        </Box>
    );
});

export default observer(AccessibilitySettingsCategoriesOverview);