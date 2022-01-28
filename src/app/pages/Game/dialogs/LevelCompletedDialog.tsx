
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
import React, {Component, useState} from "react";
import {GameplayContextConsumer, SensoGameplayContext} from "../../../context/SensoGameplayContext";
import "./Dialogs.scss"
import {IGameDialogProps} from "./StartGameDialog";

import {ReactComponent as SVGStarIcon} from "../../../../assets/images/icons/star.svg"
import { styled } from "@mui/system";
import {AccessibilityContextConsumer} from "../../../context/AccessibilityContext";
import {AccessibilityProps} from "../../../../models/accessibility/AccessibilityProps";

interface IGameDialogState {
    isOpen: boolean
}

interface ILevelCompletedDialogState extends IGameDialogState {
    starScoreARIADescription: string
}

const StarIcon = styled(SVGStarIcon)(({theme}) => ({
    '#star': {
        fill: `${theme.palette.scoringStar.empty}`
    },

    '&.reached' : {
        '#star': {
            fill: `${theme.palette.scoringStar.filled}`
        }
    }
}));

/**
 * Dialog to display game related information on a finished level.
 */
export class LevelCompletedDialog extends Component<IGameDialogProps, ILevelCompletedDialogState> {
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
        setTimeout(() => {
            this.startCounter()
        }, 200)
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
            this.context.session.start()
        }, 250);
    }

    startCounter() {
        const counters = document.querySelectorAll('.counter')
        const speed = 150
        const threeStarScore = this.context.session.threeStarLevelScore

        counters.forEach(counter => {

            const setStarReached = (starIcon: Element, waitIndex: number) => {
                setTimeout(() => {
                    if (starIcon.classList.contains('reached')) { return }
                    starIcon.classList.add('reached')
                    starIcon.classList.add('scaled')
                    setTimeout(() => {
                        starIcon.classList.remove('scaled')
                        // this.starARIADescription = `${waitIndex + 1} von 3 Sternen erreicht`
                        this.setState({
                            starScoreARIADescription: `${waitIndex + 1} von 3 Sternen erreicht`
                        })
                    }, 250)
                }, 250 + (waitIndex * 500))
            }

            const verifyReachedStars = (countedScore: number) => {
                const starIcons = document.querySelectorAll('.star-icon');
                if (countedScore >= Math.round(threeStarScore*0.3)) {
                    setStarReached(starIcons[0], 0)

                }
                if (countedScore >= Math.round(threeStarScore * 0.6)) {
                    setStarReached(starIcons[1], 1)
                }
                if (countedScore >= Math.round(threeStarScore * 0.9)) {
                    setStarReached(starIcons[2], 2)
                }
            }

            const update = () => {
                const target =  +(counter.getAttribute('data-target') ?? 0)
                const count = +(counter.innerHTML ?? 0)
                const increment = Math.round(target / speed)
                if (count < target) {
                    const sum = count + increment
                    counter.innerHTML = `${sum}`;
                    setTimeout(update, 0.5)
                } else {
                    counter.innerHTML = `${target}`
                    verifyReachedStars(target)
                }
            }
            update()
        })
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
                                aria-describedby="Ergebnisse dieser Runde"
                                className={"game-info-dialog score-info-dialog"}>
                                <Paper className={"header-title-back left"} />
                                <Paper className={"header-title-back right"} />
                                <Paper elevation={6} className={"header"} >
                                    <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography color={"white"} variant={"h5"}>
                                            Runde {`${gameplay.session.level}`}
                                        </Typography>
                                        <Icon baseClassName="material-icons-round">
                                            done
                                        </Icon>
                                    </Stack>
                                </Paper>
                                <DialogContent>
                                    <Stack direction={"column"}>
                                        <Typography id={"points-score"} variant={"h5"} color={"textPrimary"} sx={{padding: "0"}}>
                                            Erfolgreich gemeistert
                                        </Typography>
                                        <Stack direction={"column"} rowGap={"16px"}>
                                            <Stack
                                                id={"star-score"}
                                                direction={"row"}
                                                columnGap={"16px"}
                                                justifyContent={"center"}
                                                aria-label={this.state.starScoreARIADescription}>
                                                <StarIcon className={"star-icon"} aria-hidden="true" />
                                                <StarIcon className={"star-icon"} aria-hidden="true" />
                                                <StarIcon className={"star-icon"} aria-hidden="true" />
                                            </Stack>
                                            <Typography id={"points-score"} variant={"h4"} color={"textPrimary"}>
                                                <div className={"counter"} data-target={`${gameplay.session.levelScore}`}>0</div>
                                                Punkte
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </DialogContent>
                                <DialogActions sx={{justifyContent: "center"}}>
                                    <Button variant={"contained"} onClick={this.close} aria-label={"Nächste Runde starten"}>Auf zu Runde {gameplay.session.level + 1}</Button>
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