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
  ListItemIcon,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import "./AccessibilityCategorySettings.scss";
import { styled } from "@mui/system";

const marks1 = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

const marks2 = [
  {
    value: 2,
    label: "2",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 10,
    label: "ohne",
  },
];

const marks3 = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "unendlich",
  },
];

const marks4 = [
  {
    value: 0,
    label: "0",
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
    const { menuContext } = props;
    // const { accessibilityContext } = props;

    return (
      <Stack direction={"column"} className={"seeing-contentContainer"}>
        <header>
          <Button
            variant={"text"}
            aria-label={"Zurück zur Übersicht"}
            startIcon={
              <Icon baseClassName="material-icons-round">arrow_back</Icon>
            }
            onClick={() => {
              menuContext.updateSelectedCategory();
            }}
          >
            Zurück zur Übersicht
          </Button>
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
                  aria-label="Zeitdauer der Abspielung"
                  defaultValue={1}
                  valueLabelDisplay="auto"
                  step={1}
                  marks={marks1}
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
                  aria-label="Zeitlimit für Eingaben"
                  defaultValue={10}
                  valueLabelDisplay="auto"
                  step={2}
                  marks={marks2}
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
                  aria-label="Leben / Versuche"
                  defaultValue={4}
                  valueLabelDisplay="auto"
                  step={1}
                  marks={marks3}
                  min={1}
                  max={4}
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
                  aria-label="Anzahl der Tipps"
                  defaultValue={0}
                  valueLabelDisplay="auto"
                  marks={marks4}
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
