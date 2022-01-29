import React, {ChangeEvent} from "react";
import {
    Box,
    Button,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Popover,
    Slider,
    Stack,
    Switch,
    ToggleButton as MUIToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import {withAccessibilityMenuContext} from "../../../context/AccessibilityMenuContext";
import {withAccessibilityContext} from "../../../context/AccessibilityContext";
import {ColorResult, SwatchesPicker} from "react-color";
import "./AccessibilityCategorySettings.scss";
import {UIColorMode} from "../../../../models/accessibility/seeing/UIColorMode";
import {styled} from "@mui/system";
import {UIContrastMode} from "../../../../models/accessibility/seeing/UIContrastMode";

const PrimaryToggleButton = styled(MUIToggleButton)(({ theme }) => ({
  overflow: "hidden",
  color: `${theme.palette.text.secondary}`,

  "&:hover": {
    backgroundColor: theme.palette.surface!,
  },

  "&.Mui-selected": {
    color: `${theme.palette.primary.contrastText}`,
    backgroundColor: `${theme.palette.primary.main}`,
    fontSize: "0.9rem",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: `${theme.palette.primary.dark} !important`,
      opacity: "1.0 !important",
    },

    "&::before": {
      backgroundColor: `${theme.palette.primary.contrastText}`,
    },
  },
}));

const AccessibilitySeeingSettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const { menuContext, accessibilityContext } = props;

    const [popoverAnchorEl, setPopoverAnchorEl] =
      React.useState<HTMLButtonElement | null>(null);

    const [currentColorMode, setCurrentColorMode] = React.useState(
      accessibilityContext.seeing.uiColorMode
    );

    const [primaryColor, setPrimaryColor] = React.useState(
        accessibilityContext.seeing.primaryColor
    );

    const [currentContrastMode, setCurrentContrastMode] = React.useState(
      accessibilityContext.seeing.uiContrastMode
    );
    const [contrastValue, setContrastValue] = React.useState(
      accessibilityContext.seeing.contrastValue
    );

      const [showAnimations, setShowAnimations] = React.useState(
          accessibilityContext.seeing.showAnimations
      )

    const isColorPopoverOpen = Boolean(popoverAnchorEl);

    const showColorPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
      setPopoverAnchorEl(event.currentTarget);
    };

    const closeColorPopover = () => {
      setPopoverAnchorEl(null);
    };

    const onColorModeChanged = (event: React.MouseEvent<HTMLElement>, newColorMode: UIColorMode) => {
      event.preventDefault();
      if (newColorMode) {
        setCurrentColorMode(newColorMode);
        accessibilityContext.seeing.setUIColorMode(newColorMode);
      }
    };

    const onPrimaryColorChanged = (color: ColorResult) => {
      setPrimaryColor(color.hex)
      accessibilityContext.seeing.setPrimaryColor(color.hex);
    }

    const onContrastModeChanged = (event: React.MouseEvent<HTMLElement>, newContrastMode: UIContrastMode) => {
      setCurrentContrastMode(newContrastMode ?? UIContrastMode.Normal);
      accessibilityContext.seeing.setUIContrastMode(newContrastMode ?? UIContrastMode.Normal);
    };

    const onContrastValueChanged = (event: any, newValue: any) => {
      setContrastValue(newValue);
      accessibilityContext.seeing.setContrastValue(newValue);
    };

      const onShowAnimationsChanged = (event: ChangeEvent<HTMLInputElement>, isEnabled: boolean) => {
          accessibilityContext.seeing.setShowAnimations(isEnabled)
          setShowAnimations(isEnabled)
      };

    return (
      <Stack direction={"column"} className={"seeing-contentContainer"}>
        <header>
          <Tooltip arrow
                   title={`Kehre zur Übersicht aller Einstellungskategorien zurück`}
                   enterDelay={500}
                   leaveDelay={75}
                   enterNextDelay={500}>
            <Button
              variant={"text"}
              aria-label={"Zurück zur Übersicht"}
              startIcon={
                <Icon baseClassName="material-icons-round">arrow_back</Icon>
              }
              onClick={() => {
                menuContext.updateSelectedCategory();
              }}>
              Zurück zur Übersicht
            </Button>
          </Tooltip>

          <Stack direction={"row"} alignItems={"center"} className={"headline"}>
            <Icon baseClassName="material-icons-round" className={"icon"}>
              visibility
            </Icon>
            <Typography variant={"h5"}>Sehen</Typography>
          </Stack>
        </header>

        <main>
          <List subheader={<ListSubheader>Farben</ListSubheader>}>
            <ToggleButtonGroup
              exclusive
              className={"toggle-group"}
              fullWidth={true}
              orientation={"horizontal"}
              size={"large"}
              value={currentColorMode}
              color={"primary"}
              sx={{ marginBottom: "16px" }}
              onChange={onColorModeChanged}>
              <PrimaryToggleButton
                value={`${UIColorMode.Monochrome}`}
                disabled={
                  accessibilityContext.seeing.uiColorMode ===
                  UIColorMode.Monochrome
                }
                title={
                    `${accessibilityContext.seeing.uiColorMode === UIColorMode.Monochrome ? "Einfarbiger" : "Einfarbigen"} Farbmodus ${accessibilityContext.seeing.uiColorMode === UIColorMode.Monochrome ? "eingeschaltet" : "einschalten"}`}
                aria-label={
                    `${accessibilityContext.seeing.uiColorMode === UIColorMode.Monochrome ? "Einfarbiger" : "Einfarbigen"} Farbmodus ${accessibilityContext.seeing.uiColorMode === UIColorMode.Monochrome ? "eingeschaltet" : "einschalten"}`}>
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}>
                  <Icon baseClassName="material-icons-round">
                    invert_colors
                  </Icon>
                  <span className={"toggle-button-title"}>Einfarbig</span>
                </Stack>
              </PrimaryToggleButton>
              <PrimaryToggleButton
                value={`${UIColorMode.Light}`}
                disabled={
                  accessibilityContext.seeing.uiColorMode === UIColorMode.Light
                }
                title={
                    `${accessibilityContext.seeing.uiColorMode === UIColorMode.Light ? "Heller" : "Hellen"} Farbmodus ${accessibilityContext.seeing.uiColorMode === UIColorMode.Light ? "eingeschaltet" : "einschalten"}`}

              aria-label={
                  `${accessibilityContext.seeing.uiColorMode === UIColorMode.Light ? "Heller" : "Hellen"} Farbmodus ${accessibilityContext.seeing.uiColorMode === UIColorMode.Light ? "eingeschaltet" : "einschalten"}`}>
                    <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}>
                  <Icon baseClassName="material-icons-round">light_mode</Icon>
                  <span className={"toggle-button-title"}>Hell</span>
                </Stack>
              </PrimaryToggleButton>
              <PrimaryToggleButton
                value={`${UIColorMode.Dark}`}
                disabled={
                  accessibilityContext.seeing.uiColorMode === UIColorMode.Dark
                }
                title={
                    `${accessibilityContext.seeing.uiColorMode === UIColorMode.Dark ? "Dunkler" : "Dunklen"} Farbmodus ${accessibilityContext.seeing.uiColorMode === UIColorMode.Dark ? "eingeschaltet" : "einschalten"}`}
                aria-label={
                    `${accessibilityContext.seeing.uiColorMode === UIColorMode.Dark ? "Dunkler" : "Dunklen"} Farbmodus ${accessibilityContext.seeing.uiColorMode === UIColorMode.Dark ? "eingeschaltet" : "einschalten"}`}>
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Icon baseClassName="material-icons-round">dark_mode</Icon>
                  <span className={"toggle-button-title"}>Dunkel</span>
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
                aria-label="Primärfarbe für alle Bedienelemente ändern"
                onClick={showColorPopover}
              >
                <Paper
                  variant={"elevation"}
                  className={"color-swatch"}
                  sx={{
                    backgroundColor: accessibilityContext.seeing.primaryColor,
                  }}
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
                  color={primaryColor}
                  onChangeComplete={onPrimaryColorChanged}
                />
              </Popover>
            </ListItem>
          </List>
          <List subheader={<ListSubheader>Kontrast / Sättigung</ListSubheader>}>
            <ToggleButtonGroup
              exclusive
              className={"toggle-group"}
              fullWidth={true}
              orientation={"horizontal"}
              size={"large"}
              value={currentContrastMode}
              color={"primary"}
              sx={{
                  marginBottom: accessibilityContext.seeing.uiContrastMode === UIContrastMode.Normal
                    ? "0"
                    : "16px"
            }}
              onChange={onContrastModeChanged}
            >
              <PrimaryToggleButton
                value={`${UIContrastMode.HighContrast}`}
                aria-label={`Hohen Kontrast ${
                  accessibilityContext.seeing.uiContrastMode ===
                  UIContrastMode.HighContrast
                    ? "ausschalten"
                    : "einschalten"
                }`}
              >
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Icon baseClassName="material-icons-round">contrast</Icon>
                  <span className={"toggle-button-title"}>Hoher Kontrast</span>
                </Stack>
              </PrimaryToggleButton>
              <PrimaryToggleButton
                value={`${UIContrastMode.LowSaturation}`}
                aria-label={`Leichte Sättigung ${
                  accessibilityContext.seeing.uiContrastMode ===
                  UIContrastMode.LowSaturation
                    ? "ausschalten"
                    : "einschalten"
                }`}
              >
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Icon baseClassName="material-icons-round">deblur</Icon>
                  <span className={"toggle-button-title"}>
                    Leichte Sättigung
                  </span>
                </Stack>
              </PrimaryToggleButton>
              <PrimaryToggleButton
                value={`${UIContrastMode.HighSaturation}`}
                aria-label={`Hohe Sättigung ${
                  accessibilityContext.seeing.uiContrastMode ===
                  UIContrastMode.HighSaturation
                    ? "ausschalten"
                    : "einschalten"
                }`}
              >
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Icon baseClassName="material-icons-round">blur_on</Icon>
                  <span className={"toggle-button-title"}>Hohe Sättigung</span>
                </Stack>
              </PrimaryToggleButton>
            </ToggleButtonGroup>
            <ListItem
              className={"setting-list-item"}
              sx={
                accessibilityContext.seeing.uiContrastMode ===
                UIContrastMode.Normal
                  ? { display: "none" }
                  : {}
              }
            >
              <Stack
                direction={"row"}
                sx={{ width: "100%" }}
                columnGap={"4px"}
                alignItems={"center"}
              >
                <ListItemIcon>
                  <Icon baseClassName="material-icons-round">settings</Icon>
                </ListItemIcon>
                <Typography flexGrow={"1"}>
                  {accessibilityContext.seeing.uiContrastMode ===
                  UIContrastMode.Normal
                    ? "?"
                    : accessibilityContext.seeing.uiContrastMode ===
                      UIContrastMode.HighContrast
                    ? "Kontrast"
                    : "Sättigung"}
                </Typography>
                <Slider
                  sx={{ margin: "0 0 0 16px" }}
                  min={accessibilityContext.seeing.minContrastValue}
                  max={accessibilityContext.seeing.maxContrastValue}
                  value={contrastValue}
                  onChange={onContrastValueChanged}
                  aria-label={
                    accessibilityContext.seeing.uiContrastMode ===
                    UIContrastMode.HighContrast
                      ? "Kontrastwert anpassen"
                      : "Sättigungswert anpassen"
                  }
                  disabled={
                    accessibilityContext.seeing.uiContrastMode ===
                    UIContrastMode.Normal
                  }
                />
              </Stack>
            </ListItem>
          </List>
            <List subheader={<ListSubheader>Animationen</ListSubheader>}>
                <ListItem className={"setting-list-item"}>
                    <ListItemIcon>
                        <Icon baseClassName="material-icons-round">auto_awesome_motion</Icon>
                    </ListItemIcon>
                    <ListItemText id="switch-font-label" primary="Animationen anzeigen" />
                    <Switch
                        inputProps={{ "aria-label": `Animationen ${showAnimations ? "ausschalten" : "einschalten"} ` }}
                        checked={showAnimations}
                        onChange={onShowAnimationsChanged}
                    />
                </ListItem>

                <Box sx={{ mt: "16px" }} />
            </List>
        </main>
      </Stack>
    );
  })
);

export default AccessibilitySeeingSettings;
