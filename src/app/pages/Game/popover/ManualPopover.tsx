import React from "react";
import {Fab, Icon, Popover, Stack, Tooltip, Typography} from "@mui/material";

import "./ManualPopover.scss";

export default function ManualPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'manual-popover' : undefined;

    return (
        <>
            {/*<Fab size="large" color="primary" aria-label="Einen Tip für den nächsten Spielzug erhalten">*/}
            {/*    <Icon baseClassName="material-icons-round">*/}
            {/*        tips_and_updates*/}
            {/*    </Icon>*/}
            {/*</Fab>*/}
            <Stack
                direction={"column"}
                rowGap={"8px"}
                justifyContent={"center"}
                alignItems={"center"}
                alignContent={"space-around"}>
                <Tooltip arrow
                         title={`Video der Spielanleitung anzeigen`}
                         enterDelay={500}
                         leaveDelay={75}
                         enterNextDelay={500}>
                    <Fab size="large" color="primary" aria-label="Video der Spielanleitung anzeigen" aria-describedby={id} onClick={handleClick}>
                        <Icon baseClassName="material-icons-round">
                            menu_book
                        </Icon>
                    </Fab>
                </Tooltip>
                <Typography variant={"body1"}>Spielanleitung</Typography>
            </Stack>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        width: '66vw',
                        height: "calc((66vw * 9) / 16)"
                    },
                }}>
                <iframe id="manual-popover-video"
                        src="https://www.youtube.com/embed/57RP_ztLU68?rel=0&showinfo=0&autoplay=1&controls=1"
                        title="Tutorial-Video: So spielst du Senso"
                        allow="autoplay" allowFullScreen />
            </Popover>
        </>
    );
}