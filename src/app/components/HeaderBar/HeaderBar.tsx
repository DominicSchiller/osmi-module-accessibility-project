import React, { useRef } from "react";
import {AppBar, Box, Button, Icon, Toolbar, Tooltip, Typography} from "@mui/material";
import AccessibilitySettingsMenu from "../AccessibilitySettings/Menu/AccessibilitySettingsMenu";
import { useGlobalStyles } from "../../../styles/tsx/styles.global";

/**
 * The app's global header bar
 * @constructor
 */
const HeaderBar = () => {
  const buttonText = "Einstellungen";
  const globalClasses = useGlobalStyles();

  // @ts-ignore
  const settingsMenuRef = useRef<any>(null);

  const toggleMenu = () => {
    settingsMenuRef.current.toggleMenu();
  };

  return (
    <>
      <AppBar position={"sticky"} sx={{zIndex: 1301}}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant={"h6"}>
              <span className={globalClasses.brandName}>Senso</span>
            </Typography>
          </Box>
          <Tooltip arrow
                   title={"Einstellungsmenü anzeigen"}
                   enterDelay={500}
                   leaveDelay={75}
                   enterNextDelay={500}>
            <Button
                variant="text"
                startIcon={
                  <Icon baseClassName="material-icons">accessibility</Icon>
                }
                aria-label="Zeige Einstellungen für die Barrierefreiheit"
                size={"large"}
                color={"primary"}
                onClick={toggleMenu}
            >
              {buttonText}
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <AccessibilitySettingsMenu ref={settingsMenuRef} />
    </>
  );
};

export default HeaderBar;
