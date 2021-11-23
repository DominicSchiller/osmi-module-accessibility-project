import React from "react";
import Senso from "../../components/Senso/Senso";
import {withAccessibilityContext} from "../../context/AccessibilityContext";
import "./Game.scss";

export const GamePage = withAccessibilityContext((props: any) => {

    return (
        <>
            <Senso />
        </>
    );
});