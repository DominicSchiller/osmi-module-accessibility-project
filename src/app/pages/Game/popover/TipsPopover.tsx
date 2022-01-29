import React from "react";
import {Fab, Icon, Popover, Stack, Tooltip, Typography} from "@mui/material";

import "./Popover.scss";
import {GameplayContextConsumer, GameplaySession} from "../../../context/SensoGameplayContext";

export default function TipsPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
        GameplaySession.incrementTakenTips()
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'manual-popover' : undefined;

    return (
        <GameplayContextConsumer>
            {(gameplay: any) =>
                <>
                    <Popover
                        id={id}
                        open={open}
                        keepMounted={false}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}>
                        <Typography textAlign={"center"} sx={{p: 2}}>Versuche es doch mal mit<br/>
                            <span id={"next-pick-hint"}>
                                {gameplay.session.nextTip()[0]}<br/>
                                {gameplay.session.nextTip()[1]}
                            </span>
                        </Typography>
                    </Popover><Stack
                    direction={"column"}
                    rowGap={"8px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    alignContent={"space-around"}>
                    <Tooltip arrow
                             title={`Erhalte einen Tipp für die nächste Taste`}
                             enterDelay={500}
                             leaveDelay={75}
                             enterNextDelay={500}>
                        <Fab
                            size="large"
                            color="primary"
                            disabled={gameplay.session.isPlayingSequence || gameplay.session.numberOfTips === 0}
                            onClick={handleClick}
                            aria-label="Einen Tip für den nächsten Spielzug erhalten">
                            <Icon baseClassName="material-icons-round">
                                tips_and_updates
                            </Icon>
                        </Fab>
                    </Tooltip>
                    <Typography variant={"body1"}>Tipp</Typography>
                </Stack>

                </>
            }
        </GameplayContextConsumer>
    );
}