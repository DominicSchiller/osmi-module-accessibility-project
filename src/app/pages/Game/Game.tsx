import React, {useEffect} from "react";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import SensoView from "../../components/Senso/Senso.View";
import "./Game.scss";
import {Grid} from "@mui/material";
import {StartGameDialog} from "./dialogs/StartGameDialog";
import {
    GameplayContextConsumer,
    GameplayContextProvider
} from "../../context/SensoGameplayContext";
import {observer} from "mobx-react";
import {LevelCompletedDialog} from "./dialogs/LevelCompletedDialog";
import {withTheme} from "@mui/styles";
import {useDidMount} from "../../../utils/Hooks";

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
                   <Grid container direction={"column"} className={"page-container"}>
                       <SensoView disabled={context.session.isPlayingSequence || context.session.isRoundFinished} />
                       <StartGameDialog ref={dialogRef} />
                       { context.session.isLevelCompleted ?
                           <LevelCompletedDialog theme={theme} /> : <></>
                       }
                   </Grid>
               }
           </GameplayContextConsumer>

       </GameplayContextProvider>
    );
}));

export default observer(GamePage);