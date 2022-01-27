import React, {ChangeEvent} from "react";
import {
  Button,
  Box,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Slider,
  Stack,
  Switch,
  Typography, Tooltip,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import "./AccessibilityCategorySettings.scss";
import { styled } from "@mui/system";

const marks1 = [
  {
    value: 24,
    label: "Klein",
  },
  {
    value: 36,
    label: "Normal",
  },
  {
    value: 48,
    label: "Groß",
  },
];

const volumeMarks = [
  {
    value: 0,
    label: "Aus",
  },
  {
    value: 50,
    label: "50 %",
  },
  {
    value: 100,
    label: "100 %",
  },
];

const ListItemBox = styled(Box)(({ theme }) => ({
  color: `${theme.palette.text.secondary}`,
  backgroundColor: `${theme.palette.surface!}`,
  fontSize: "1.2rem",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  marginTop: "16px",
  marginBottom: "16px",

  "&:last-of-type": {
    marginBottom: "0",
  },

  "&:first-of-type": {
    marginTop: "0",
  },
}));

const AccessibilityHearingSettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const { menuContext, accessibilityContext } = props;

    const [soundEffectsVolume, setSoundEffectsVolume] = React.useState(
        accessibilityContext.hearing.soundEffectsVolume
    );

    const [showSubtitles, setShowSubtitles] = React.useState(
        accessibilityContext.hearing.showSubtitles
    )

    const [subtitleFontSize, setSubtitleFontSize] = React.useState(
        accessibilityContext.hearing.subtitleFontSize
    );

    const onSoundEffectsVolumeChanged = (event: any, newValue: any) => {
      accessibilityContext.hearing.setSoundEffectsVolume(newValue);
      setSoundEffectsVolume(newValue);
    };

    const onShowSubtitlesChanged = (event: ChangeEvent<HTMLInputElement>, isEnabled: boolean) => {
      accessibilityContext.hearing.setShowSubtitles(isEnabled);
      setShowSubtitles(isEnabled)
    };

    const onSubtitleFontSizeChanged = (event: any, newValue: any) => {
      accessibilityContext.hearing.setSubtitleFontSize(newValue);
      setSubtitleFontSize(newValue);
    }

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
              hearing
            </Icon>
            <Typography variant={"h5"}>Hören</Typography>
          </Stack>
        </header>

        <main>
          <List subheader={<ListSubheader>Toneinstellungen</ListSubheader>}>
            <ListItemBox>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <ListItemIcon>
                  <Icon
                    baseClassName="material-icons-round"
                    sx={{ fontSize: 36 }}
                  >
                    music_note
                  </Icon>
                </ListItemIcon>
                <Box sx={{ typography: "body1", ml: 0 }}>
                  Lautstärke der Soundeffekte
                </Box>
              </Box>
              <Box sx={{ px: 2, pt: 1 }}>
                <Slider
                  aria-label="Lautstärke der Sound Effekte anpassen"
                  value={soundEffectsVolume}
                  onChange={onSoundEffectsVolumeChanged}
                  valueLabelDisplay="auto"
                  marks={volumeMarks}
                />
              </Box>
            </ListItemBox>
          </List>
          <List subheader={<ListSubheader>Untertitel</ListSubheader>}>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">subtitles</Icon>
              </ListItemIcon>
              <ListItemText id="switch-font-label" primary="Untertitel" />
              <Switch
                inputProps={{ "aria-label": `Anzeige von Untertitel ${showSubtitles ? "ausschalten" : "einschalten"} ` }}
                checked={showSubtitles}
                onChange={onShowSubtitlesChanged}
              />
            </ListItem>

            <Box sx={{ mt: "16px" }} />

            <ListItemBox>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <ListItemIcon>
                  <Icon
                    baseClassName="material-icons-round"
                    sx={{ fontSize: 36 }}
                  >
                    text_format
                  </Icon>
                </ListItemIcon>
                <Box sx={{ typography: "body1", ml: 0 }}>
                  Schriftgröße der Untertitel
                </Box>
              </Box>
              <Box sx={{ px: 2, pt: 1 }}>
                <Slider
                  aria-label="Schriftgröße der Unterittel anpassen"
                  value={subtitleFontSize}
                  onChange={onSubtitleFontSizeChanged}
                  valueLabelDisplay="auto"
                  marks={marks1}
                  min={24}
                  max={48}
                />
              </Box>
            </ListItemBox>
          </List>
        </main>
      </Stack>
    );
  })
);

export default AccessibilityHearingSettings;
