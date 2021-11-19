import React from "react";
import {
    Breadcrumbs, Button,
    Divider,
    Icon,
    IconButton, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Popover,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import {withAccessibilityMenuContext} from "../../../context/AccessibilityMenuContext";
import {withAccessibilityContext} from "../../../context/AccessibilityContext";
import {SwatchesPicker} from "react-color";
import "./AccessibilityCategorySettings.scss";
import {rgbaString} from "../../../../utils/ColorUtils";


const AccessibilitySeeingSettings = withAccessibilityContext(withAccessibilityMenuContext((props: any) => {
    const {menuContext} = props;
    const {accessibilityContext} = props;

    const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const showColorPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPopoverAnchorEl(event.currentTarget);
    };

    const closeColorPopover = () => {
        setPopoverAnchorEl(null);
    };

    const isColorPopoverOpen = Boolean(popoverAnchorEl);
    return(
        <Stack direction={"column"} className={"seeing-contentContainer"}>
            <header>
                <Stack direction={"row"} alignItems={"center"}>
                    <IconButton
                        aria-label="Zurück zum Einstellungen Menü"
                        color={"primary"}
                        sx={{
                            backgroundColor: rgbaString(accessibilityContext.primaryColor, 0.15),
                            marginRight: "8px"}}
                        onClick={() => { menuContext.updateSelectedCategory() }}>
                        <Icon baseClassName="material-icons-round">
                            arrow_back
                        </Icon>
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb" separator={
                        <>
                            <Icon baseClassName="material-icons-round" sx={{fontSize: "16px"}}>
                                arrow_forward_ios
                            </Icon>
                        </>
                    }>
                        <Link underline="hover" color="inherit" href={"#"}
                              onClick={() => { menuContext.updateSelectedCategory() }}>
                            Einstellungen Barrierefreiheit
                        </Link>
                        <Typography color="primary" sx={{fontWeight: "700"}}>
                            Sehen
                        </Typography>
                    </Breadcrumbs>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} className={"headline"}>
                    <Icon baseClassName="material-icons-round" className={"icon"}>
                        visibility
                    </Icon>
                    <Typography variant={"h5"}>
                        Sehen
                    </Typography>
                </Stack>
            </header>
            <Divider />
            <main>
                <List subheader={<ListSubheader>Schriftart</ListSubheader>}>
                    <ListItem className={"setting-list-item"}>
                        <ListItemIcon>
                            <Icon baseClassName="material-icons-round">
                                text_fields
                            </Icon>
                        </ListItemIcon>
                        <ListItemText id="switch-font-label" primary="Atkinson Hyperlegible" />
                        <Switch
                            edge="end"
                            inputProps={{
                                'aria-labelledby': 'an / aus Switch für die Verwendung der Schriftart Atkinson Hyperlegible',
                            }}
                            onChange={(event, checked) => {
                                accessibilityContext.fontFamily = checked ? "Atkinson-Hyperlegible" : "Inter"
                            }}
                            checked={accessibilityContext.fontFamily === "Atkinson-Hyperlegible"}
                        />
                    </ListItem>
                </List>
                <List subheader={<ListSubheader>Farben</ListSubheader>}>
                    <ListItem className={"setting-list-item"}>
                        <ListItemIcon>
                            <Icon baseClassName="material-icons-round">
                                palette
                            </Icon>
                        </ListItemIcon>
                        <ListItemText id="switch-primary-color-label" primary="Primärfarbe - Aktionselemente" />
                        <Button className={"color-swatch-button"} onClick={showColorPopover}>
                            <Paper variant={"elevation"} className={"color-swatch"} sx={{backgroundColor: accessibilityContext.primaryColor}} square />
                        </Button>
                        <Popover
                            open={isColorPopoverOpen}
                            anchorEl={popoverAnchorEl}
                            onClose={closeColorPopover}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
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
            </main>
        </Stack>
    );
}));

export default AccessibilitySeeingSettings;