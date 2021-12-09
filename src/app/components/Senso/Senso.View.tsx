import React from "react";
import './Senso.View.scss'
import {SensoButtonView} from "./Button/SensoButton.View";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import {Stack, Typography} from "@mui/material";
import {ReactComponent as TopLeftClippingMask} from "../../../assets/images/senso/top-left-cm.svg";
import {ReactComponent as TopRightClippingMask} from "../../../assets/images/senso/top-right-cm.svg";
import {ReactComponent as BottomLeftClippingMask} from "../../../assets/images/senso/bottom-left-cm.svg";
import {ReactComponent as BottomRightClippingMask} from "../../../assets/images/senso/bottom-right-cm.svg";
import {SensoButton, SensoButtonID} from "./Button/SensoButton.Model";
import {withTheme} from "@mui/styles";


/**
 * The Senso game component.
 */
const SensoView = withTheme(withAccessibilityContext((props: any) => {
    const {accessibilityContext, theme} = props;

    // definition of all four senso buttons (two buttons each row)
    const sensoButtons: SensoButton[][] = [
        [
            new SensoButton(SensoButtonID.TopLeft, "Mond", "bedtime", accessibilityContext.seeing.sensoTopLeftActionButtonColor, props.disabled),
            new SensoButton(SensoButtonID.TopRight, "Stern", "star",  accessibilityContext.seeing.sensoTopRightActionButtonColor, props.disabled)
        ],
        [
            new SensoButton(SensoButtonID.BottomLeft, "Wolke","wb_cloudy", accessibilityContext.seeing.sensoBottomLeftActionButtonColor, props.disabled),
            new SensoButton(SensoButtonID.BottomRight, "Sonne","wb_sunny",  accessibilityContext.seeing.sensoBottomRightActionButtonColor, props.disabled)
        ]
    ];

    return (
        <>
            <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} id={"senso-container"}>
                <div id="description-box">
                    <Typography id={"game-request-title"} variant={"h4"} color={"textSecondary"}>Merke dir die Reihenfolge</Typography>
                    <Typography id={"subtitle"} color={"textPrimary"} />
                </div>
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