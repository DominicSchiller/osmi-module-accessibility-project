
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import React, {Component} from "react";
import {GameplayContextConsumer, SensoGameplayContext} from "../../../context/SensoGameplayContext";
import "./Dialogs.scss"
import {IGameDialogProps} from "./StartLevelDialog";

interface IGameDialogState {
    isOpen: boolean
}

/**
 * Dialog to display game related information on a finished level.
 */
export class FinishedLevelDialog extends Component<IGameDialogProps, IGameDialogState> {
    static contextType = SensoGameplayContext

    /**
     * Create a new level dialog.
     * @param props dialog properties
     */
    constructor(props: IGameDialogProps) {
        super(props);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
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
        this.context.session.start();
    }

    render() {
        return (
            <GameplayContextConsumer>
                {(context: any) =>
                    <Dialog
                        open={context.session.isLevelCompleted}
                        TransitionComponent={DialogTransition}
                        keepMounted
                        onClose={this.close}
                        aria-describedby="Ergebnisse dieser Runde"
                        className={"game-info-dialog"}
                    >
                        <DialogTitle className={"title"}>{`Runde ${context.session.level} Geschafft`}</DialogTitle>
                        <DialogContent>
                            <Typography color={"textSecondary"}>
                                TOLL! <br />
                                Du hast mit nur {context.session.attempts} Versuchen alle {context.session.level} Farben richtig gemerkt.<br />
                                <br />
                                Weiter so :-)
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{justifyContent: "center"}}>
                            <Button variant={"contained"} onClick={this.close} aria-label={"Nächste Runde starten"}>Auf zu Runde {context.session.level + 1}!</Button>
                        </DialogActions>
                    </Dialog>
                }
            </GameplayContextConsumer>

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