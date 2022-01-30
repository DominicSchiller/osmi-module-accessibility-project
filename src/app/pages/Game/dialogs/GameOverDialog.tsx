
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon, Paper,
    Slide, Stack,
    Typography
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import React, {Component} from "react";
import {GameplayContextConsumer, SensoGameplayContext} from "../../../context/SensoGameplayContext";
import "./Dialogs.scss"
import {IGameDialogProps} from "./StartGameDialog";

import {AccessibilityContextConsumer} from "../../../context/AccessibilityContext";
import {AccessibilityProps} from "../../../../models/accessibility/AccessibilityProps";
import {ReactComponent as CoinIcon} from "../../../../assets/images/icons/coin.svg";

interface IGameDialogState {
    isOpen: boolean
}

interface ILevelCompletedDialogState extends IGameDialogState {
    starScoreARIADescription: string
}

/**
 * Dialog to display game related information on finished game (game over state).
 */
export class GameOverDialog extends Component<IGameDialogProps, ILevelCompletedDialogState> {
    static contextType = SensoGameplayContext

    /**
     * Create a new level dialog.
     * @param props dialog properties
     */
    constructor(props: IGameDialogProps) {
        super(props);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);

        this.state = {
            isOpen: true,
            starScoreARIADescription: "0 von 3 Sternen erreicht."
        }
    }

    /**
     * Open the dialog.
     */
    open() {
        this.setState({
            isOpen: true
        });
    }

    /**
     * Close the dialog.
     */
    close() {
        this.setState({
            isOpen: false
        });
        setTimeout(() => {
            this.context.session.start(true)
        }, 250);
    }

    render() {
        return (
            <AccessibilityContextConsumer>
                {(accessibility: AccessibilityProps) =>
                    <GameplayContextConsumer>
                        {(gameplay: any) =>
                            <Dialog
                                open={this.state.isOpen}
                                TransitionComponent={DialogTransition}
                                keepMounted={false}
                                onClose={(event, reason) => {
                                    if (reason !== 'backdropClick') {
                                        this.close()
                                    }
                                }}
                                aria-describedby="Spiel beendet. Deine Ergebnisse."
                                className={"game-info-dialog score-info-dialog"}>
                                <Paper className={"header-title-back left"} />
                                <Paper className={"header-title-back right"} />
                                <Paper elevation={6} className={"header"} >
                                    <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography color={"white"} variant={"h5"}>
                                            Spiel beendet
                                        </Typography>
                                        <Icon baseClassName="material-icons-round">
                                            verified
                                        </Icon>
                                    </Stack>
                                </Paper>
                                <DialogContent>
                                    <Stack direction={"column"} rowGap={"24px"}>
                                       <Stack direction={"column"}>
                                           <Typography id={"points-score"} variant={"body1"} color={"textPrimary"} sx={{padding: "0"}}>
                                               Leider ist das Spiel schon vorbei<br />
                                           </Typography>
                                           <Typography variant={"h6"} color={"textPrimary"} sx={{padding: "0"}}>
                                               Deine Ergebnisse
                                           </Typography>
                                       </Stack>
                                        <Stack id={"game-results"} direction={"column"} rowGap={"24px"} justifyContent={"space-around"}>
                                            <Stack direction={"row"} alignItems={"center"} rowGap={"16px"} columnGap={"24px"}>
                                                <Icon color={"primary"} baseClassName="material-icons-round game-result-icon">military_tech</Icon>
                                                <Typography variant={"h4"} color={"textPrimary"} flexGrow={1} sx={{textAlign: "left"}}>
                                                    <span>{gameplay.session.level-1}</span> Level
                                                </Typography>
                                            </Stack>
                                            <Stack direction={"row"} alignItems={"center"} rowGap={"16px"} columnGap={"24px"}>
                                                <CoinIcon className={"game-result-icon"} />
                                                <Typography variant={"h4"} color={"textPrimary"} flexGrow={1} sx={{textAlign: "left"}}>
                                                    <span>{gameplay.session.playerTotalScore}</span> Punkte
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </DialogContent>
                                <DialogActions sx={{justifyContent: "center"}}>
                                    <Button variant={"contained"} onClick={this.close} aria-label={"Neues Spiel starten"}>Neues Spiel starten</Button>
                                </DialogActions>
                            </Dialog>
                        }
                    </GameplayContextConsumer>
                }
            </AccessibilityContextConsumer>
        )
    }
}

const DialogTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});