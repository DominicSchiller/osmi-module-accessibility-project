import React from "react";
import {Box, Button as MUIButton, Icon, Typography} from "@mui/material";
import {styled} from "@mui/system";
import "./AccessibilityCategoriesOverview.scss";
import {AccessibilitySettingsCategory} from "../../../../models/AccessibilitySettingsCategory";
import {observer} from "mobx-react";
import {withAccessibilityMenuContext} from "../../../context/AccessibilityMenuContext";

/**
 * Custom styled accessibility category button.
 */
const StyledAccessibilityCategoryButton = styled(MUIButton)`
  height: 160px;
  width: 160px;
  
  ${props => props.theme.breakpoints.between("xs", "sm")} {
    height: 40vw;
    width: 40vw;
  }
  flex-direction: column;
  font-weight: 500;
  span {
    margin: 4px 0;
    font-size: 36px !important;
  }
  &:focus-visible {
    font-weight: 700;
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
const AccessibilityCategoriesOverview = withAccessibilityMenuContext((props: any) => {
    const {menuContext} = props

    const categories = [
        { title: "Sehen", icon: "visibility", category: AccessibilitySettingsCategory.Seeing },
        { title: "Motorik", icon: "touch_app", category: AccessibilitySettingsCategory.MotorActivity},
        { title: "Hören", icon: "hearing", category: AccessibilitySettingsCategory.Hearing },
        { title: "Kognitiv", icon: "psychology", category: AccessibilitySettingsCategory.Cognitive },
    ];

    return(
        <Box className={"overview-contentContainer"}>
            <header>
                <Box className={"heroIcon"}>
                    <Icon baseClassName="material-icons-round" className={"icon"}>
                        accessibility_new
                    </Icon>
                </Box>
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

export default observer(AccessibilityCategoriesOverview);