import React, { useRef } from "react";
import { AppBar, Box, Button, Icon, Toolbar, Typography } from "@mui/material";
import AccessibilitySettingsMenu from "../AccessibilitySettings/Menu/AccessibilitySettingsMenu";
import { useGlobalStyles } from "../../../styles/tsx/styles.global";

/**
 * The app's global header bar
 * @constructor
 */
const HeaderBar = () => {
  const globalClasses = useGlobalStyles();

  // @ts-ignore
  const settingsMenuRef = useRef<any>(null);

  const toggleMenu = () => {
    settingsMenuRef.current.toggleMenu();
  };

  return (
    <>
      <AppBar position={"sticky"} style={{ zIndex: 1301 }}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant={"h6"}>
              <span className={globalClasses.brandName}>Senso</span>
            </Typography>
          </Box>
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
            Barrierefreiheit
          </Button>
        </Toolbar>
      </AppBar>
      <AccessibilitySettingsMenu ref={settingsMenuRef} />
    </>
  );
};

export default HeaderBar;
