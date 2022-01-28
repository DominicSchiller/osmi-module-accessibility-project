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
import {styled} from "@mui/system";
import "./AccessibilityCategorySettings.scss";
import {GameMode} from "../../../../models/accessibility/motor/GameMode";

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

const ListItemBox = styled(Box)(({theme}) => ({
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

const PrimaryToggleButton = styled(MUIToggleButton)(({theme}) => ({
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

        const {menuContext, accessibilityContext} = props;

        const [gameMode, setGameMode] = React.useState(
            accessibilityContext.motor.gameMode
        )

        const [levelCountdownDuration, setlevelCountdownDuration] = React.useState(
            accessibilityContext.motor.levelCountdownDuration
        )

        const [showPlayerLives, setShowPlayerLives] = React.useState(
            accessibilityContext.motor.showPlayerLives
        )

        const [showTotalScore, setShowTotalScore] = React.useState(
            accessibilityContext.motor.showTotalScore
        )

        const onGameModeChanged = (event: React.MouseEvent<HTMLElement>, newGameMode: string) => {
            event.preventDefault();
            if (newGameMode) {
                accessibilityContext.motor.setGameMode(newGameMode)
                setGameMode(newGameMode);
            }
        };

        const onShowTotalScoreChanged = (event: ChangeEvent<HTMLInputElement>, isEnabled: boolean) => {
            accessibilityContext.motor.setShowTotalScore(isEnabled)
            setShowTotalScore(isEnabled)
        };

        const onShowPlayerLivesChanged = (event: ChangeEvent<HTMLInputElement>, isEnabled: boolean) => {
            accessibilityContext.motor.setShowPlayerLives(isEnabled)
            setShowPlayerLives(isEnabled)
        };

        const onLevelCountdownChanged = (event: any, newValue: any) => {
            accessibilityContext.motor.levelCountdownDuration = newValue
            setlevelCountdownDuration(newValue)
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
                            touch_app
                        </Icon>
                        <Typography variant={"h5"}>Bedienen</Typography>
                    </Stack>
                </header>

                <main>
                    <List
                        subheader={
                            <ListSubheader component="div">
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Box sx={{flexGrow: 1}}>Spielmodus</Box>
                                    {/*<Icon baseClassName="material-icons-outlined">info</Icon>*/}
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
                            value={gameMode}
                            onChange={onGameModeChanged}
                            color={"primary"}
                            sx={{marginBottom: "16px"}}>
                            <PrimaryToggleButton
                                aria-label="Mit Symbolen spielen"
                                value={GameMode.Symbols}
                                disabled={gameMode === GameMode.Symbols}>
                                <Stack
                                    direction={"column"}
                                    alignContent={"center"}
                                    textAlign={"center"}
                                    alignItems={"center"}>
                                    <Icon baseClassName="material-icons-round">star</Icon>
                                    <span className={"toggle-button-title"}>Symbole</span>
                                </Stack>
                            </PrimaryToggleButton>
                            <PrimaryToggleButton
                                aria-label="Mit Tiergeräuschen spielen"
                                value={GameMode.Animals}
                                disabled={gameMode === GameMode.Animals}>
                                <Stack
                                    direction={"column"}
                                    alignContent={"center"}
                                    textAlign={"center"}
                                    alignItems={"center"}>
                                    <Icon baseClassName="material-icons-round">pets</Icon>
                                    <span className={"toggle-button-title"}>Tiere</span>
                                </Stack>
                            </PrimaryToggleButton>
                            <PrimaryToggleButton
                                aria-label="Mit Musikinstrumenten spielen"
                                value={GameMode.Instruments}
                                disabled={gameMode === GameMode.Instruments}>
                                <Stack
                                    direction={"column"}
                                    alignContent={"center"}
                                    textAlign={"center"}
                                    alignItems={"center"}>
                                    <Icon baseClassName="material-icons-round">piano</Icon>
                                    <span className={"toggle-button-title"}>Instrumente</span>
                                </Stack>
                            </PrimaryToggleButton>
                        </ToggleButtonGroup>

                    </List>
                    <List
                        subheader={
                            <ListSubheader>Anzeigen während des Spiels</ListSubheader>}>
                        <ListItem className={"setting-list-item"}>
                            <ListItemIcon>
                                <Icon baseClassName="material-icons-round">favorite</Icon>
                            </ListItemIcon>
                            <ListItemText
                                id="show-lives-label"
                                primary="Leben anzeigen"/>
                            <Switch
                                checked={showPlayerLives}
                                onChange={onShowPlayerLivesChanged}
                                inputProps={{
                                    "aria-label": `Noch verfügbare Leben ${showPlayerLives ? "ausblenden" : "anzeigen"}`,
                                }}/>
                        </ListItem>
                        <ListItem className={"setting-list-item"}>
                            <ListItemIcon>
                                <Icon baseClassName="material-icons-round">assessment</Icon>
                            </ListItemIcon>
                            <ListItemText
                                id="show-score-label"
                                primary="Punktestand anzeigen"/>
                            <Switch
                                checked={showTotalScore}
                                onChange={onShowTotalScoreChanged}
                                inputProps={{
                                    "aria-label": `Punktestand ${showTotalScore ? "ausblenden" : "anzeigen"}`,
                                }}/>
                        </ListItem>
                        <ListItemBox>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}>
                                <ListItemIcon>
                                    <Icon
                                        baseClassName="material-icons-round"
                                        sx={{fontSize: 36}}>
                                        timer
                                    </Icon>
                                </ListItemIcon>
                                <Box sx={{typography: "body1", ml: 0}}>
                                    Countdown vor jeder Runde
                                </Box>
                            </Box>
                            <Box sx={{px: 2, pt: 1}}>
                                <Slider
                                    aria-label="Dauer des Countdowns vor jeder Runde ändern"
                                    value={levelCountdownDuration}
                                    onChange={onLevelCountdownChanged}
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
