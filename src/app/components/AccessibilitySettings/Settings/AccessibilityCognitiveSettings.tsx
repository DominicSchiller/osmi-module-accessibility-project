import React from "react";
import {
  Button,
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Stack,
  Slider,
  Typography,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import "./AccessibilityCategorySettings.scss";
// import { rgbaString } from "../../../../utils/ColorUtils";

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
    label: "kein Limit",
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
    label: "kein Limit",
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
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">timer</Icon>
              </ListItemIcon>
              <ListItemText
                id="switch-font-label"
                primary="Zeitdauer der Abspielung (Sekunden)"
              />
              <Slider
                aria-label="Zeitdauer der Abspielung"
                defaultValue={1}
                valueLabelDisplay="auto"
                step={1}
                marks={marks1}
                min={1}
                max={5}
              />
            </ListItem>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">av_timer</Icon>
              </ListItemIcon>
              <ListItemText
                id="switch-font-label"
                primary="Zeitlimit für Eingaben"
              />
              <Slider
                aria-label="Zeitlimit für Eingaben"
                defaultValue={10}
                valueLabelDisplay="auto"
                step={2}
                marks={marks2}
                min={2}
                max={10}
              />
            </ListItem>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">favorite</Icon>
              </ListItemIcon>
              <ListItemText id="switch-font-label" primary="Leben / Versuche" />
              <Slider
                aria-label="Leben / Versuche"
                defaultValue={4}
                valueLabelDisplay="auto"
                step={1}
                marks={marks3}
                min={1}
                max={4}
              />
            </ListItem>
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">lightbulb</Icon>
              </ListItemIcon>
              <ListItemText id="switch-font-label" primary="Anzahl der Tipps" />
              <Slider
                aria-label="Anzahl der Tipps"
                defaultValue={0}
                valueLabelDisplay="auto"
                marks={marks4}
                step={null}
                min={0}
                max={5}
              />
            </ListItem>
          </List>
        </main>
      </Stack>
    );
  })
);

export default AccessibilityCognitiveSettings;
