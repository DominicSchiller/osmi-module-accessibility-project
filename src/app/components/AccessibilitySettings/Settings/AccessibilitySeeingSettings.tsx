import React from "react";
import {
  Breadcrumbs,
  Button,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Popover,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import { SwatchesPicker } from "react-color";
import "./AccessibilityCategorySettings.scss";
import { rgbaString } from "../../../../utils/ColorUtils";

const AccessibilitySeeingSettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const { menuContext } = props;
    const { accessibilityContext } = props;

    const [popoverAnchorEl, setPopoverAnchorEl] =
      React.useState<HTMLButtonElement | null>(null);

    const showColorPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
      setPopoverAnchorEl(event.currentTarget);
    };

    const closeColorPopover = () => {
      setPopoverAnchorEl(null);
    };

    const isColorPopoverOpen = Boolean(popoverAnchorEl);
    return (
      <Stack direction={"column"} className={"seeing-contentContainer"}>
        <header>
          <Button
              variant={"text"}
              aria-label={"Zurück zur Übersicht"}
              startIcon={<Icon baseClassName="material-icons-round">arrow_back</Icon>}
              onClick={() => {
                menuContext.updateSelectedCategory();
              }}>
            Zurück zur Übersicht
          </Button>

          <Stack direction={"row"} alignItems={"center"} className={"headline"}>
            <Icon baseClassName="material-icons-round" className={"icon"}>
              visibility
            </Icon>
            <Typography variant={"h5"}>Sehen</Typography>
          </Stack>
        </header>

        <main>
          <List subheader={<ListSubheader>Schriftart</ListSubheader>}>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">text_fields</Icon>
              </ListItemIcon>
              <ListItemText
                id="switch-font-label"
                primary="Besser lesbare Schriftart"
              />
              <Switch
                edge="end"
                inputProps={{
                  "aria-labelledby":
                    "An / Aus Switch für die Verwendung der Schriftart Atkinson Hyperlegible",
                }}
                onChange={(event, checked) => {
                  accessibilityContext.fontFamily = checked
                    ? "Atkinson-Hyperlegible"
                    : "Inter";
                }}
                checked={
                  accessibilityContext.fontFamily === "Atkinson-Hyperlegible"
                }
              />
            </ListItem>
          </List>
          <List subheader={<ListSubheader>Farben</ListSubheader>}>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">palette</Icon>
              </ListItemIcon>
              <ListItemText
                id="switch-primary-color-label"
                primary="Farbe für Aktionselemente"
              />
              <Button
                className={"color-swatch-button"}
                onClick={showColorPopover}
              >
                <Paper
                  variant={"elevation"}
                  className={"color-swatch"}
                  sx={{ backgroundColor: accessibilityContext.primaryColor }}
                  square
                />
              </Button>
              <Popover
                open={isColorPopoverOpen}
                anchorEl={popoverAnchorEl}
                onClose={closeColorPopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <SwatchesPicker
                  color={accessibilityContext.primaryColor}
                  onChangeComplete={(color) => {
                    console.info(color);
                    accessibilityContext.primaryColor = color.hex;
                  }}
                />
              </Popover>
            </ListItem>
          </List>
          <List subheader={<ListSubheader>Kontrast</ListSubheader>}>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">contrast</Icon>
              </ListItemIcon>
              <ListItemText
                id="set-contrast-label"
                primary="Hochkontrastmodus"
              />
              <Switch
                edge="end"
                inputProps={{
                  "aria-labelledby":
                    "An / Aus Switch für die Verwendung eines Darkmodes",
                }}
              />
            </ListItem>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">dark_mode</Icon>
              </ListItemIcon>
              <ListItemText id="set-contrast-label" primary="Dark Mode" />
              <Switch
                edge="end"
                inputProps={{
                  "aria-labelledby":
                    "An / Aus Switch für die Verwendung eines Darkmodes",
                }}
              />
            </ListItem>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">format_paint</Icon>
              </ListItemIcon>
              <ListItemText
                id="set-contrast-label"
                primary="Sättigkeitsmodus"
              />
              <Switch
                edge="end"
                inputProps={{
                  "aria-labelledby":
                    "An / Aus Switch für die Verwendung eines Sättigkeitsmodus",
                }}
              />
            </ListItem>
          </List>
        </main>
      </Stack>
    );
  })
);

export default AccessibilitySeeingSettings;
