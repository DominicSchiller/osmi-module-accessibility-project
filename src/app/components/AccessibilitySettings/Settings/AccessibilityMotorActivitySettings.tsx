import React from "react";
import {
  Button,
  Box,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Slider,
  Switch,
  ToggleButton as MUIToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import { styled } from "@mui/system";
import "./AccessibilityCategorySettings.scss";
// import { rgbaString } from "../../../../utils/ColorUtils";

const volumeMarks = [
  {
    value: 0,
    label: "Aus",
  },
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
}));

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

const AccessibilityMotorActivitySettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const [mode, setMode] = React.useState("symbols");

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newMode: string
    ) => {
      setMode(newMode);
    };

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
              touch_app
            </Icon>
            <Typography variant={"h5"}>Bedienen</Typography>
          </Stack>
        </header>

        <main>
          <List
            subheader={
              <ListSubheader component="div">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>Spielemodus</Box>
                  <Icon baseClassName="material-icons-outlined">info</Icon>
                </Box>
              </ListSubheader>
            }
          >
            <ToggleButtonGroup
              exclusive
              className={"toggle-group"}
              fullWidth={true}
              orientation={"horizontal"}
              size={"large"}
              value={mode}
              onChange={handleChange}
              color={"primary"}
              sx={{ marginBottom: "16px" }}
            >
              <PrimaryToggleButton
                aria-label="Mit Symbolen spielen"
                value="symbols"
              >
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Icon baseClassName="material-icons-round">star</Icon>
                  <span className={"toggle-button-title"}>Symbole</span>
                </Stack>
              </PrimaryToggleButton>
              <PrimaryToggleButton
                aria-label="Mit Tiergeräuschen spielen"
                value="animals"
              >
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Icon baseClassName="material-icons-round">pets</Icon>
                  <span className={"toggle-button-title"}>Tiere</span>
                </Stack>
              </PrimaryToggleButton>
              <PrimaryToggleButton
                aria-label="Mit Musikinstrumenten spielen"
                value="instruments"
              >
                <Stack
                  direction={"column"}
                  alignContent={"center"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Icon baseClassName="material-icons-round">piano</Icon>
                  <span className={"toggle-button-title"}>Instrumente</span>
                </Stack>
              </PrimaryToggleButton>
            </ToggleButtonGroup>
          </List>
          <List
            subheader={
              <ListSubheader>Anzeigen während des Spiels</ListSubheader>
            }
          >
            <ListItem className={"setting-list-item"}>
              <ListItemIcon>
                <Icon baseClassName="material-icons-round">assessment</Icon>
              </ListItemIcon>
              <ListItemText
                id="show-score-label"
                primary="Punktestand pro Spielrunde"
              />
              <Switch
                defaultChecked
                inputProps={{
                  "aria-label": "Punktestand pro Spielrunde anzeigen",
                }}
              />
            </ListItem>
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
                <Box sx={{ typography: "body1", ml: 0 }}>
                  Countdown vor jeder Runde
                </Box>
              </Box>
              <Box sx={{ px: 2, pt: 1 }}>
                <Slider
                  aria-label="Länge des Countdowns vor jeder Runde"
                  defaultValue={3}
                  valueLabelDisplay="auto"
                  marks={volumeMarks}
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

export default AccessibilityMotorActivitySettings;
