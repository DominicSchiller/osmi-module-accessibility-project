import React, {useEffect} from "react";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import SensoView from "../../components/Senso/Senso.View";
import "./Game.scss";
import {CssBaseline, Grid, Icon, Stack, Tooltip, Typography} from "@mui/material";
import {StartGameDialog} from "./dialogs/StartGameDialog";
import {
    GameplayContextConsumer,
    GameplayContextProvider
} from "../../context/SensoGameplayContext";
import {observer} from "mobx-react";
import {LevelCompletedDialog} from "./dialogs/LevelCompletedDialog";
import {withTheme} from "@mui/styles";
import {useDidMount} from "../../../utils/Hooks";
import {ReactComponent as CoinIcon} from "../../../assets/images/icons/coin.svg";

/**
 * The app's senso game page component.
 */
const GamePage = withTheme(withAccessibilityContext((props: any) => {

    const didMount = useDidMount()
    const dialogRef = React.createRef<StartGameDialog>()
    const {theme} = props

    useEffect(() => {
        if (didMount()) { return }
        setTimeout(() => {
            dialogRef.current?.open()
        }, 500)
    }, [didMount, dialogRef]);

    return (
       <GameplayContextProvider>
           <GameplayContextConsumer>
               {(context: any) =>
                   <>
                       <CssBaseline />
                       <Grid
                           container
                           component={"main"}
                           direction={"column"}
                           rowGap={"8px"}
                           sx={{overflowY: "hidden"}}>
                           <Stack direction={"row"} justifyContent={"space-between"} id="hud">
                               <Tooltip arrow
                                        title={"Anzeige wie viele Leben du noch hast"}
                                        enterDelay={500}
                                        leaveDelay={75}
                                        enterNextDelay={500}>
                                   <Stack id="life" direction={"row"} alignItems={"center"} columnGap={"8px"}>
                                       <Icon baseClassName="material-icons-round" className={"hud-icon"}>
                                           favorite
                                       </Icon>
                                       <Typography color={"textPrimary"} className={"hud-stats"}>{context.session.playerLife} Leben</Typography>
                                   </Stack>
                               </Tooltip>
                               <Tooltip arrow
                                        title={"Anzeige wie viele Punkte du bereits gewonnen hast"}
                                        enterDelay={500}
                                        leaveDelay={75}
                                        enterNextDelay={500}>
                                   <Stack id="points" direction={"row"} alignItems={"center"} columnGap={"8px"}>
                                   <Typography color={"textPrimary"} className={"hud-stats"}>{context.session.playerTotalScore} Punkte</Typography>
                                   <CoinIcon className={"hud-icon"} />
                               </Stack>
                               </Tooltip>
                           </Stack>
                           <SensoView disabled={context.session.isPlayingSequence || context.session.isRoundFinished} />
                           <StartGameDialog ref={dialogRef} />
                           { context.session.isLevelCompleted ?
                               <LevelCompletedDialog theme={theme} /> : <></>
                           }
                       </Grid>
                       <footer>
                           <Typography variant={"h6"}>Untertitel</Typography>
                           <div id="description-box">
                               <Typography id={"subtitle"} color={"textPrimary"} />
                           </div>
                       </footer>
                   </>
               }
           </GameplayContextConsumer>

       </GameplayContextProvider>
    );
}));

export default observer(GamePage);