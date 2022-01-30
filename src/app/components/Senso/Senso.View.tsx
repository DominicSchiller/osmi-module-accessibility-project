import React, {useContext, useEffect} from "react";
import './Senso.View.scss'
import {Icon, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {ReactComponent as TopLeftClippingMask} from "../../../assets/images/senso/top-left-cm.svg";
import {ReactComponent as TopRightClippingMask} from "../../../assets/images/senso/top-right-cm.svg";
import {ReactComponent as BottomLeftClippingMask} from "../../../assets/images/senso/bottom-left-cm.svg";
import {ReactComponent as BottomRightClippingMask} from "../../../assets/images/senso/bottom-right-cm.svg";
import {SensoButton, SensoButtonID} from "./Buttons/SensoButton.Model";
import {withTheme} from "@mui/styles";
import {SensoGameplayContext} from "../../context/SensoGameplayContext";
import {observer} from "mobx-react";
import {SensoButtonContentRepository} from "../../../repositories/SensoButtonContentRepository";
import {SensoButtonColorRepository} from "../../../repositories/SensoButtonColorRepository";
import {} from "../../../utils/ArrayChunks"
import {fixSensoAspectRatio} from "../../../utils/UIWorkarounds";
import SensoButtonView from "./Buttons/SensoButton.View";
import ManualPopover from "../../pages/Game/popover/ManualPopover";
import TipsPopover from "../../pages/Game/popover/TipsPopover";
import {ReactComponent as CorrectTap} from "../../../assets/images/icons/correct.svg";
import {ReactComponent as WrongTap} from "../../../assets/images/icons/wrong.svg";

/**
 * The Senso game component.
 */
const SensoView = withTheme((props: any) => {
    const {theme, gameMode, colorMode} = props;
    const gameplay = useContext(SensoGameplayContext)

    // definition of all four senso buttons (two buttons each row)
    const sensoButtons = Object.values(SensoButtonID).map(id => {
        return new SensoButton(id,
            SensoButtonContentRepository.getContent(id, gameMode),
            SensoButtonColorRepository.getColor(id, colorMode),
            props.disabled)
    }).chunked(2);

    useEffect(() => {
        fixSensoAspectRatio()
    }, [])

    return (
        <>
            <Stack
                id={"senso-container"}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    top: {
                        xs: "-48px",
                        sm: "inherit"
                    },
                }}>
                <Stack
                    direction={{
                        xs: "row",
                        sm: "column"
                    }}
                    rowGap={"16px"}
                    columnGap={"16px"}
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        left: {
                            xs: "50%",
                            sm: "inherit"
                        },
                        right: {
                            xs: "inherit",
                            sm: "24px"
                        },
                        bottom: {
                            xs: "-24px",
                            sm: 0
                        },
                        transform: {
                            xs: "translateX(-50%)",
                            sm: "inherit"
                        }
                }}>
                    <TipsPopover />
                    <ManualPopover />
                </Stack>
                <aside id="action-items-menu">
                    {gameplay.session.isCountingDown &&
                        <Typography
                            id="countdown"
                            variant={"caption"} />
                    }
                    {gameplay.session.isLevelStarted &&
                        <Tooltip arrow
                                 title={"Die Reihenfolge nocheinmal wiederholen lassen."}
                                 enterDelay={500}
                                 leaveDelay={75}
                                 enterNextDelay={500}>
                            <Stack direction={"column"}
                                   justifyContent={"center"}
                                   alignItems={"center"}
                                   alignContent={"space-around"}
                                   id="repeat-sequence-stack">
                                <IconButton
                                    aria-label={"Reihenfolge nochmal wiederholen."}
                                    color={"primary"}
                                    className={"action-button"}
                                    onClick={() => {
                                        gameplay.session.replaySequence()
                                    }}
                                    disabled={gameplay.session.isPlayingSequence}>
                                    <Icon baseClassName="material-icons-round" className={"icon"}>
                                        replay
                                    </Icon>
                                </IconButton>
                                <Typography variant={"body1"}>Wiederholen</Typography>
                            </Stack>
                        </Tooltip>
                    }
                    <CorrectTap id={"correct-tap-feedback"} className={"feedback-icon hidden"} />
                    <WrongTap id={"wrong-tap-feedback"} className={"feedback-icon hidden"} />
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
});

export default observer(SensoView);