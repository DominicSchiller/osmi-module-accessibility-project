import React from "react";
import {
  Button,
  Box,
  List,
  ListSubheader,
  Icon,
  Stack,
  Slider,
  Typography,
  ListItemIcon, Tooltip,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import "./AccessibilityCategorySettings.scss";
import { styled } from "@mui/system";

const sensoButtonHighlightDurationMarks = [
  {
    value: 1,
    label: "1 sek",
  },

  {
    value: 3,
    label: "3 sek",
  },

  {
    value: 5,
    label: "5 sek",
  },
];

const playerAnswerTimeMarks = [
  {
    value: 2,
    label: "2 sek",
  },
  {
    value: 4,
    label: "4 sek",
  },
  {
    value: 6,
    label: "6 sek",
  },
  {
    value: 8,
    label: "8 sek",
  },
  {
    value: 10,
    label: "ohne",
  },
];

const playerLivesMarks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 7,
    label: "beliebig",
  },
];

const numberOfTipsMarks = [
  {
    value: 0,
    label: "keine",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 5,
    label: "5",
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
  marginBottom: "16px",

  "&:last-of-type": {
    marginBottom: "0",
  },
}));

const AccessibilityCognitiveSettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const { menuContext, accessibilityContext } = props;

    const [sensoButtonHighlightDuration, setSensoButtonHighlightDuration] = React.useState(
        accessibilityContext.cognitive.sensoButtonHighlightingDuration
    )

    const [playerAnswerTime, setPlayerAnswerTime] = React.useState(
        accessibilityContext.cognitive.playerAnswerTime
    )

    const [playerLives, setPlayerLives] = React.useState(
        accessibilityContext.cognitive.playerLives
    )

    const [numberOfTips, setNumberOfTips] = React.useState(
        accessibilityContext.cognitive.numberOfTips
    )

    const onSensoButtonHighlightingDurationChanged = (event: any, newValue: any) => {
      accessibilityContext.cognitive.setSensoButtonHighlightingDuration(newValue)
      setSensoButtonHighlightDuration(newValue)
    }

    const onPlayerAnswerTimeChanged = (event: any, newValue: any) => {
      accessibilityContext.cognitive.setPlayerAnswerTime(newValue)
      setPlayerAnswerTime(newValue)
    }

    const onPlayerLivesChanged = (event: any, newValue: any) => {
      accessibilityContext.cognitive.setPlayerLives(newValue)
      setPlayerLives(newValue)
    }

    const onNumberOfTipsChanged = (event: any, newValue: any) => {
      accessibilityContext.cognitive.setNumberOfTips(newValue)
      setNumberOfTips(newValue)
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
              psychology
            </Icon>
            <Typography variant={"h5"}>Schwierigkeit</Typography>
          </Stack>
        </header>

        <main>
          <List subheader={<ListSubheader>Zeit und Tempo</ListSubheader>}>
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
                    timer
                  </Icon>
                </ListItemIcon>
                <Box sx={{ typography: "body1", ml: 1 }}>
                  Zeitdauer der Abspielung in Sekunden
                </Box>
              </Box>
              <Box sx={{ px: 2, pt: 1 }}>
                <Slider
                  sx={{ width: 1 }}
                  aria-label="Zeitdauer der Abspielung ändern"
                  value={sensoButtonHighlightDuration}
                  onChange={onSensoButtonHighlightingDurationChanged}
                  valueLabelDisplay="auto"
                  marks={sensoButtonHighlightDurationMarks}
                  min={1}
                  max={5}
                />
              </Box>
            </ListItemBox>
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
                    av_timer
                  </Icon>
                </ListItemIcon>
                <Box sx={{ typography: "body1", ml: 1 }}>
                  Zeitlimit für Eingaben
                </Box>
              </Box>
              <Box sx={{ px: 2, pt: 1 }}>
                <Slider
                  aria-label="Zeitlimit für Eingaben ändern"
                  value={playerAnswerTime}
                  onChange={onPlayerAnswerTimeChanged}
                  valueLabelDisplay="auto"
                  step={2}
                  marks={playerAnswerTimeMarks}
                  min={2}
                  max={10}
                />
              </Box>
            </ListItemBox>
          </List>

          <List
            subheader={<ListSubheader>Hilfe und Lebenspunkte</ListSubheader>}
          >
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
                    favorite
                  </Icon>
                </ListItemIcon>
                <Box sx={{ typography: "body1", ml: 1 }}>Anzahl an Leben</Box>
              </Box>
              <Box sx={{ px: 2, pt: 1 }}>
                <Slider
                  aria-label="Maximale Anzahl an Leben / Versuche ändern"
                  value={playerLives}
                  onChange={onPlayerLivesChanged}
                  valueLabelDisplay="auto"
                  step={1}
                  marks={playerLivesMarks}
                  min={1}
                  max={7}
                />
              </Box>
            </ListItemBox>
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
                    lightbulb
                  </Icon>
                </ListItemIcon>
                <Box sx={{ typography: "body1", ml: 1 }}>Anzahl an Tipps</Box>
              </Box>
              <Box sx={{ px: 2, pt: 1 }}>
                <Slider
                  aria-label="Anzahl der Tipps pro Runde ändern"
                  value={numberOfTips}
                  onChange={onNumberOfTipsChanged}
                  valueLabelDisplay="auto"
                  marks={numberOfTipsMarks}
                  step={null}
                  min={0}
                  max={5}
                />
              </Box>
            </ListItemBox>
          </List>
        </main>
      </Stack>
    );
  })
);

export default AccessibilityCognitiveSettings;
