import React from "react";
import './Senso.scss'
import {SensoButtonProps, SensoButton} from "./Buttons/SensoButton";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import {Stack} from "@mui/material";
import {ReactComponent as TopLeftClippingMask} from "../../../assets/images/senso/top-left-cm.svg";
import {ReactComponent as TopRightClippingMask} from "../../../assets/images/senso/top-right-cm.svg";
import {ReactComponent as BottomLeftClippingMask} from "../../../assets/images/senso/bottom-left-cm.svg";
import {ReactComponent as BottomRightClippingMask} from "../../../assets/images/senso/bottom-right-cm.svg";

/**
 * The Senso game component.
 */
const Senso = withAccessibilityContext((props: any) => {
    const {accessibilityContext} = props;

    // definition of all four senso buttons (two buttons each row)
    const sensoButtons: SensoButtonProps[][] = [
        [
            { id: 1, alignment: 'top-left', icon: 'bedtime', color: accessibilityContext.sensoTopLeftActionButtonColor },
            { id: 2, alignment: 'top-right', icon: 'star', color: accessibilityContext.sensoTopRightActionButtonColor}
        ],
        [
            { id: 3, alignment: 'bottom-left', icon: 'wb_cloudy', color: accessibilityContext.sensoBottomLeftActionButtonColor },
            { id: 4, alignment: 'bottom-right', icon: 'wb_sunny', color: accessibilityContext.sensoBottomRightActionButtonColor }
        ]
    ];

    return (
        <>
            <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} id={"senso-container"}>
                <Stack direction={"column"} justifyContent={"space-between"} id={"senso"}>
                    {sensoButtons.map(buttonRow => {
                        return (
                            <Stack direction={"row"} className={"button-row"} justifyContent={"space-between"}>
                                {buttonRow.map(buttonProps =>
                                    <SensoButton {...buttonProps} />
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
});

export default Senso;