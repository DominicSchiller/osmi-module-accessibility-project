import React, {useEffect} from "react";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import SensoView from "../../components/Senso/Senso.View";
import "./Game.scss";
import {Grid} from "@mui/material";
import {StartLevelDialog} from "./dialogs/StartLevelDialog";
import {
    GameplayContextConsumer,
    GameplayContextProvider
} from "../../context/SensoGameplayContext";
import {observer} from "mobx-react";
import {FinishedLevelDialog} from "./dialogs/FinishedLevelDialog";

/**
 * The app's senso game page component.
 */
const GamePage = withAccessibilityContext((props: any) => {

    const dialogRef = React.createRef<StartLevelDialog>()

    useEffect(() => {
        setTimeout(() => {
            dialogRef.current?.open()
        }, 500)
    }, [dialogRef]);

    return (
       <GameplayContextProvider>
           <GameplayContextConsumer>
               {(context: any) =>
                   <Grid container direction={"column"} className={"page-container"}>
                       <SensoView disabled={context.session.isPlayingSequence || context.session.isRoundFinished} />
                       <StartLevelDialog ref={dialogRef} />
                       <FinishedLevelDialog />
                   </Grid>
               }
           </GameplayContextConsumer>

       </GameplayContextProvider>
    );
});

export default observer(GamePage);