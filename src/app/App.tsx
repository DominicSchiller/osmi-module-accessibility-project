import React, { Component} from "react";
import {Routes, Route } from "react-router-dom"
import "./App.scss";
import {ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import "@fontsource/inter"
import {GamePage} from "./pages/Game/Game";
import HomePage from "./pages/Home/Home";
import {AccessibilityContextProvider} from "./context/AccessibilityContext";
import {AccessibilityProps} from "../models/AccessibilityProps";
import {observer} from "mobx-react";
import HeaderBar from "./components/HeaderBar/HeaderBar";

/**
 * The main app component.
 */

@observer
export default class App extends Component {

   private accessibilityProps: AccessibilityProps = new AccessibilityProps();

  render() {
      const theme = createTheme({
          typography: {
              fontFamily: this.accessibilityProps.fontFamily,
          },
          palette: {
              primary: {
                  main: this.accessibilityProps.primaryColor,
              },
              contrastThreshold: 3
          },
          components: {
              MuiListSubheader: {
                  styleOverrides: {
                      root: {
                          fontWeight: "bold"
                      }
                  }
              },
              MuiListItem: {
                  styleOverrides: {
                      root: {
                          minHeight: "64px",
                          borderRadius: "16px",
                          backgroundColor: "#f4f4f4"
                      }
                  }
              },
              MuiListItemIcon: {
                  styleOverrides: {
                      root: {
                          minWidth: "36px",
                          ".MuiIcon-root": {
                              fontSize: "32px"
                          }
                      },
                  }
              },
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

      return (
          <>
              <AccessibilityContextProvider accessibilityContext={this.accessibilityProps}>
                      <ThemeProvider theme={theme}>
                         <>
                             <HeaderBar />
                             <Routes>
                                 <Route path="/*" element={<HomePage/>}/>
                                 <Route path={"/Game"} element={<GamePage/>}/>
                             </Routes>
                         </>
                      </ThemeProvider>
              </AccessibilityContextProvider>
          </>
      );
  }
}
