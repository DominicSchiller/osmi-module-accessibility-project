import React from "react";
import {
    Button,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Popover,
    Stack,
    Switch,
    ToggleButton as MUIToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import { SwatchesPicker } from "react-color";
import "./AccessibilityCategorySettings.scss";
import {UIColorMode} from "../../../../models/accessibility/seeing/UIColorMode";
import {styled} from "@mui/system";


const PrimaryToggleButton = styled(MUIToggleButton)(({ theme }) => ({
    overflow: 'hidden',
    color: `${theme.palette.text.secondary}`,

    '&:hover': {
        backgroundColor: theme.palette.surface!,
    },

    '&.Mui-selected': {
        color: `${theme.palette.primary.contrastText}`,
        backgroundColor: `${theme.palette.primary.main}`,
        fontSize: '0.9rem',
        fontWeight: 'bold',

        '&:hover': {
            backgroundColor: `${theme.palette.primary.dark} !important`,
            opacity: '1.0 !important'
        },

        '&::before': {
            backgroundColor: `${theme.palette.primary.contrastText}`
        }
    }
}));

const AccessibilitySeeingSettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const { menuContext } = props;
    const { accessibilityContext } = props;

    const [popoverAnchorEl, setPopoverAnchorEl] =
      React.useState<HTMLButtonElement | null>(null);

    const [currentUIMode, setCurrentUIMode] = React.useState(accessibilityContext.seeing.uiColorMode);

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
                  accessibilityContext.seeing.fontFamily = checked
                    ? "Atkinson-Hyperlegible"
                    : "Inter";
                }}
                checked={
                  accessibilityContext.seeing.fontFamily === "Atkinson-Hyperlegible"
                }
              />
            </ListItem>
          </List>
          <List subheader={<ListSubheader>Farben</ListSubheader>}>
              <ToggleButtonGroup
                  exclusive
                  className={"toggle-group"}
                  fullWidth={true}
                  orientation={"horizontal"}
                  size={"large"}
                  value={currentUIMode}
                  color={"primary"}
                  sx={{marginBottom: "16px"}}
                  onChange={(event, nextView) => {accessibilityContext.seeing.setUIColorMode(nextView); setCurrentUIMode(nextView)}}>
                  <PrimaryToggleButton value={`${UIColorMode.Monochrome}`} aria-label="einfarbiger Modus">
                      <Stack direction={"column"} alignContent={"center"} textAlign={"center"} alignItems={"center"}>
                          <Icon baseClassName="material-icons-round">invert_colors</Icon>
                          Einfarbig
                      </Stack>
                  </PrimaryToggleButton>
                  <PrimaryToggleButton value={`${UIColorMode.Light}`} aria-label="heller Modus" color={"primary"}>
                      <Stack direction={"column"} alignContent={"center"} textAlign={"center"} alignItems={"center"}>
                          <Icon baseClassName="material-icons-round">light_mode</Icon>
                          Hell
                      </Stack>
                  </PrimaryToggleButton>
                  <PrimaryToggleButton value={`${UIColorMode.Dark}`} aria-label="dunkler Modus">
                      <Stack direction={"column"} alignContent={"center"} textAlign={"center"} alignItems={"center"}>
                          <Icon baseClassName="material-icons-round">dark_mode</Icon>
                          Dunkel
                      </Stack>
                  </PrimaryToggleButton>
              </ToggleButtonGroup>
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
                  sx={{ backgroundColor: accessibilityContext.seeing.primaryColor }}
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
                  color={accessibilityContext.seeing.primaryColor}
                  onChangeComplete={(color) => {
                    accessibilityContext.seeing.primaryColor = color.hex;
                  }}
                />
              </Popover>
            </ListItem>
          </List>
          <List subheader={<ListSubheader>Kontrast</ListSubheader>}>
          </List>
        </main>
      </Stack>
    );
  })
);

export default AccessibilitySeeingSettings;
