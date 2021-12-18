
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide, Theme,
    Typography
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import React, {Component} from "react";
import {GameplayContextConsumer, SensoGameplayContext} from "../../../context/SensoGameplayContext";
import "./Dialogs.scss"

export interface IGameDialogProps {
    theme?: Theme
}

interface IGameDialogState {
    isOpen: boolean
}

/**
 * Dialog to display game related information before starting the actual level.
 */
export class StartGameDialog extends Component<IGameDialogProps, IGameDialogState> {
    static contextType = SensoGameplayContext

    /**
     * Create a new level dialog.
     * @param props dialog properties
     */
    constructor(props: IGameDialogProps) {
        super(props);
        this.state = {
            isOpen: false
        }
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
                {(value: any) =>
                    <Dialog
                        open={this.state.isOpen}
                        TransitionComponent={DialogTransition}
                        keepMounted
                        onClose={this.close}
                        aria-describedby="Information zur bevorstehenden Runde"
                        className={"game-info-dialog"}
                    >
                        <DialogTitle className={"title"}>Bevor es losgeht ...</DialogTitle>
                        <DialogContent>
                            <Typography color={"textSecondary"}>
                                Versuche Dir die richtige Reihenfolge der gleich aufleuchtenden Tasten zu merken.
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{justifyContent: "center"}}>
                            <Button variant={"contained"} onClick={this.close} aria-label={"Runde starten"}>Los geht's!</Button>
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