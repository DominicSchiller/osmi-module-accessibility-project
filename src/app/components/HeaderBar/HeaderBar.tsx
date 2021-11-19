import React, {useRef} from "react";
import {AppBar, Box, Icon, IconButton, Toolbar, Typography} from "@mui/material";
import AccessibilitySettingsMenu from "../AccessibilitySettings/Menu/AccessibilitySettingsMenu";
import {useGlobalStyles} from "../../../styles/tsx/styles.global";

/**
 * The app's global header bar
 * @constructor
 */
const HeaderBar = () => {
    const globalClasses = useGlobalStyles();

    // @ts-ignore
    const settingsMenuRef = useRef<any>(null)

    const toggleMenu = () => {
        settingsMenuRef.current.toggleMenu()
    }

    return (
      <>
          <AppBar position={"sticky"} className={"appBar"} style={{zIndex:1301}} >
              <Toolbar>
                  <Box display='flex' flexGrow={1}>
                      <Typography variant={"h6"}>
                          <span className={globalClasses.brandName}>Senso</span>
                      </Typography>
                  </Box>
                  <IconButton
                      aria-label="Zeige Einstellungen für Barrierefreiheit"
                      size={"large"}
                      color={"primary"}
                      onClick={toggleMenu}>
                      <Icon baseClassName="material-icons-round">
                          settings_accessibility
                      </Icon>
                  </IconButton>
              </Toolbar>
          </AppBar>
          <AccessibilitySettingsMenu ref={settingsMenuRef} />
      </>
    );
}

export default HeaderBar;