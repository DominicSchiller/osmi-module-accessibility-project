import React, {useCallback, useEffect, useState} from "react";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import SensoView from "../../components/Senso/Senso.View";
import {SensoGameplaySession} from "../../../gameplay/SensoGameplaySession";
import "./Game.scss";
import {Grid} from "@mui/material";

/**
 * The app's senso game page component.
 */
export const GamePage = withAccessibilityContext((props: any) => {

    const [isPlayingSequence, setIsPlayingSequence] = useState(true)

    /**
     * trigger a countdown starting from given counter.
     * @param counter The counter which will be counted down
     */
    const countDown = useCallback((counter: number) => {
        setTimeout(() => {
            switch (counter) {
                case -1:
                    SensoGameplaySession.shared.generateNewSequence()
                    SensoGameplaySession.shared.presentRandomSequence().then(() => {
                        setIsPlayingSequence(false)
                        document.getElementById("game-request-title")!.innerHTML = "Und jetzt du ..."
                        document.getElementById("subtitle")!.innerHTML = "?"
                    });
                    break;
                case 0:
                    document.getElementById("subtitle")!.innerHTML = "&nbsp;"
                    countDown(-1)
                    break;
                default:
                    document.getElementById("subtitle")!.innerHTML = `${counter}`
                    countDown(counter-1)
            }
        }, 1200);

    }, []);

    useEffect(() => {
        if (!SensoGameplaySession.shared.isSessionStarted) {
            setIsPlayingSequence(true)
            // start game after timeout
            setTimeout(() => {
                document.getElementById("game-request-title")!.innerHTML = ""
                countDown(3)
            }, 3000);
        }
    }, [isPlayingSequence, countDown]);

    return (
        <Grid container direction={"column"} className={"page-container"}>
            <SensoView disabled={isPlayingSequence} />
        </Grid>
    );
});