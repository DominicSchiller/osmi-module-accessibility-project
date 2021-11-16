import React, { Component } from "react";
import {Routes, Route } from "react-router-dom"
import "./App.scss";
import {ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import "@fontsource/inter"
import {GamePage} from "./pages/Game/Game";
import HomePage from "./pages/Home/Home";

/**
 * The main app component.
 */
export default class App extends Component {

    private theme = createTheme({
        typography: {
            fontFamily: 'Inter',
        },
        palette: {
            primary: {
                main: '#000000',
            },
            contrastThreshold: 3
        },
        components: {
            // Name of the component
            MuiButton: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        minHeight: 64,
                        textTransform: "uppercase"
                    },
                },
            }
        }
    });

  render() {
      return (
          <>
              <ThemeProvider theme={this.theme}>
                  <Routes>
                      <Route path="/*" element={<HomePage/>}/>
                      <Route path={"/Game/*"} element={<GamePage/>}/>
                  </Routes>
              </ThemeProvider>
          </>
      );
  }
}
