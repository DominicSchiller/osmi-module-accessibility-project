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
    const {theme, accessibilityContext} = props

    useEffect(() => {
        if (didMount()) { return }
        setTimeout(() => {
            dialogRef.current?.open()
        }, 500)
    }, [didMount, dialogRef]);

    return (
       <GameplayContextProvider>
           <GameplayContextConsumer>
               {(gameplayContext: any) =>
                   <>
                       <CssBaseline />
                       <Grid
                           container
                           component={"main"}
                           direction={"column"}
                           alignItems={"end"}
                           rowGap={"8px"}
                           sx={{overflowY: "hidden"}}>
                           <audio controls id="audio-player" hidden={true} />
                           <Stack
                               id="hud"
                               direction={"row"}
                               alignItems={"start"}
                               justifyContent={
                                accessibilityContext.motor.showPlayerLives || accessibilityContext.motor.showNumberOfTips
                                    ? "space-between"
                                    : "end"
                           }>
                               <Stack direction={"column"}
                                      rowGap={"8px"}>
                                   { accessibilityContext.motor.showPlayerLives &&
                                       <Tooltip arrow
                                                title={"Anzeige wie viele Leben du noch hast"}
                                                enterDelay={500}
                                                leaveDelay={75}
                                                enterNextDelay={500}>
                                           <Stack id="life" direction={"row"} alignItems={"center"} columnGap={"8px"}>
                                               <Icon baseClassName="material-icons-round" className={"hud-icon"}>
                                                   favorite
                                               </Icon>
                                               <Typography color={"textPrimary"} className={"hud-stats"}>
                                                   {accessibilityContext.cognitive.playerLives === 7 ? "unendlich Leben" : `${gameplayContext.session.playerLife} Leben`}
                                               </Typography>
                                           </Stack>
                                       </Tooltip>
                                   }
                                   { accessibilityContext.motor.showNumberOfTips &&
                                       <Tooltip arrow
                                                title={"Anzeige wie viele Tipps Du noch erhalten kannst"}
                                                enterDelay={500}
                                                leaveDelay={75}
                                                enterNextDelay={500}>
                                           <Stack id="tips" direction={"row"} alignItems={"center"} columnGap={"8px"}>
                                               <Icon baseClassName="material-icons-round" className={"hud-icon"}>
                                                   lightbulb
                                               </Icon>
                                               <Typography color={"textPrimary"} className={"hud-stats"}>
                                                   {accessibilityContext.cognitive.numberOfTips === 7 ? "unendlich Tipps" : `${gameplayContext.session.numberOfTips} Tipps`}
                                               </Typography>
                                           </Stack>
                                       </Tooltip>

                                   }
                               </Stack>
                               {accessibilityContext.motor.showTotalScore &&
                                   <Tooltip arrow
                                            title={"Anzeige wie viele Punkte du bereits gewonnen hast"}
                                            enterDelay={500}
                                            leaveDelay={75}
                                            enterNextDelay={500}>
                                       <Stack id="points" direction={"row"} alignItems={"center"} columnGap={"8px"}>
                                           <Typography color={"textPrimary"} className={"hud-stats"}>{gameplayContext.session.playerTotalScore} Punkte</Typography>
                                           <CoinIcon className={"hud-icon"} />
                                       </Stack>
                                   </Tooltip>
                               }
                           </Stack>
                           <SensoView gameMode={accessibilityContext.motor.gameMode}
                                      colorMode={accessibilityContext.seeing.uiColorMode}
                                      showAnimations={accessibilityContext.seeing.showAnimations}
                                      disabled={gameplayContext.session.isPlayingSequence || gameplayContext.session.isRoundFinished} />
                           <StartGameDialog ref={dialogRef} />
                           { gameplayContext.session.isLevelCompleted ?
                               <LevelCompletedDialog theme={theme} /> : <></>
                           }
                       </Grid>
                       { accessibilityContext.hearing.showSubtitles &&
                           <footer>
                               <Typography variant={"h6"}>Untertitel</Typography>
                               <div id="description-box">
                                   <Typography id={"subtitle"} color={"textPrimary"} sx={{fontSize: `${accessibilityContext.hearing.subtitleFontSize}px !important`}} />
                               </div>
                           </footer>
                       }
                   </>
               }
           </GameplayContextConsumer>
       </GameplayContextProvider>
    );
}));

export default GamePage;