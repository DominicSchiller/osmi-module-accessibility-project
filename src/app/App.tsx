import React, {Component} from "react";
import {Routes, Route} from "react-router-dom"
import "./App.scss";
import {ThemeProvider} from "@mui/material";
import "@fontsource/inter"
import HomePage from "./pages/Home/Home";
import {AccessibilityContextProvider} from "./context/AccessibilityContext";
import {AccessibilityProps} from "../models/accessibility/AccessibilityProps";
import {observer} from "mobx-react";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import AppTheme from "./theme/AppTheme";
import GamePage from "./pages/Game/Game";

/**
 * The main app component.
 */

@observer
export default class App extends Component {

    private accessibilityProps: AccessibilityProps = new AccessibilityProps();

    render() {
        const theme = AppTheme.create(this.accessibilityProps)

        return (
            <AccessibilityContextProvider accessibilityContext={this.accessibilityProps}>
                <ThemeProvider theme={theme}>
                    <>
                        <HeaderBar/>
                        <Routes>
                            <Route path="/*" element={<HomePage/>}/>
                            <Route path={"/Game"} element={<GamePage/>}/>
                        </Routes>
                    </>
                </ThemeProvider>
            </AccessibilityContextProvider>
        );
    }
}
