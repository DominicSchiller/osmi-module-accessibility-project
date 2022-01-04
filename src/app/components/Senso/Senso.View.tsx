import React from "react";
import './Senso.View.scss'
import {SensoButtonView} from "./Button/SensoButton.View";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import {Icon, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {ReactComponent as TopLeftClippingMask} from "../../../assets/images/senso/top-left-cm.svg";
import {ReactComponent as TopRightClippingMask} from "../../../assets/images/senso/top-right-cm.svg";
import {ReactComponent as BottomLeftClippingMask} from "../../../assets/images/senso/bottom-left-cm.svg";
import {ReactComponent as BottomRightClippingMask} from "../../../assets/images/senso/bottom-right-cm.svg";
import {SensoButton, SensoButtonID} from "./Button/SensoButton.Model";
import {withTheme} from "@mui/styles";
import {UIColorMode} from "../../../models/accessibility/seeing/UIColorMode";


/**
 * The Senso game component.
 */
const SensoView = withTheme(withAccessibilityContext((props: any) => {
    const {accessibilityContext, theme} = props;

    // definition of all four senso buttons (two buttons each row)
    const sensoButtons: SensoButton[][] = [
        [
            new SensoButton(SensoButtonID.TopLeft,
                "Mond",
                "bedtime",
                accessibilityContext.seeing.uiColorMode === UIColorMode.Monochrome ? accessibilityContext.seeing.sensoTopRightActionButtonColor : accessibilityContext.seeing.sensoTopLeftActionButtonColor,
                props.disabled),
            new SensoButton(SensoButtonID.TopRight,
                "Stern",
                "star",
                accessibilityContext.seeing.sensoTopRightActionButtonColor,
                props.disabled)
        ],
        [
            new SensoButton(SensoButtonID.BottomLeft,
                "Wolke",
                "wb_cloudy",
                accessibilityContext.seeing.uiColorMode === UIColorMode.Monochrome ? accessibilityContext.seeing.sensoTopRightActionButtonColor : accessibilityContext.seeing.sensoBottomLeftActionButtonColor,
                props.disabled),
            new SensoButton(SensoButtonID.BottomRight,
                "Sonne",
                "wb_sunny",
                accessibilityContext.seeing.uiColorMode === UIColorMode.Monochrome ? accessibilityContext.seeing.sensoTopRightActionButtonColor : accessibilityContext.seeing.sensoBottomRightActionButtonColor,
                props.disabled)
        ]
    ];

    return (
        <>
            <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} id={"senso-container"}>
                <aside id="action-items-menu">
                    <Typography id="countdown" variant={"caption"} hidden={true} />
                    <Tooltip arrow
                             title={"Die Reihenfolge nocheinmal wiederholen lassen."}
                             enterDelay={500}
                             leaveDelay={75}
                             enterNextDelay={500}>
                        <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} alignContent={"space-around"} >
                            <IconButton aria-label={"Reihenfolge nochmal wiederholen."} color={"primary"} className={"action-button"}>
                                <Icon baseClassName="material-icons-round" className={"icon"}>
                                    replay
                                </Icon>
                            </IconButton>
                            <Typography variant={"body1"}>Wiederholen</Typography>
                        </Stack>
                    </Tooltip>
                </aside>
                <Stack direction={"column"} justifyContent={"space-between"} id={"senso"} sx={{backgroundColor: theme.palette.surface}}>
                    {sensoButtons.map((buttonRow, index) => {
                        return (
                            <Stack direction={"row"} className={"button-row"} key={index} justifyContent={"space-between"}>
                                {buttonRow.map(buttonProps =>
                                    <SensoButtonView key={buttonProps.id} {...buttonProps} />
                                )}
                            </Stack>
                        )
                    })}
                </Stack>
            </Stack>
            <TopLeftClippingMask />
            <TopRightClippingMask />
            <BottomLeftClippingMask />
            <BottomRightClippingMask />
        </>
    );
}));

export default SensoView;