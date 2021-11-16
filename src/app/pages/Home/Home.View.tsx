import React, {useRef} from "react";
import {
    AppBar, Box,
    Button as MUIButton,
    Container,
    CssBaseline, Grid, Icon, IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import { styled } from '@mui/system';
import "@fontsource/inter/700.css"

import {useGlobalStyles} from "../../../styles/tsx/styles.global";
import {useNavigate} from "react-router-dom";
import HomeViewModel from "./Home.ViewModel";
import {observer} from "mobx-react";
import AccessibilitySettingsMenu from "../../components/AccessibilitySettings/Menu/AccessibilitySettingsMenu";

const PrimaryButton = styled(MUIButton)`
  color: white;
  background-color: black;
  height: 64px;
  margin-top: 36px;
`;

interface HomeViewProps {
    viewModel: HomeViewModel
}

const HomePageView = ({viewModel}: HomeViewProps) => {
    const navigate = useNavigate();
    const globalClasses = useGlobalStyles()

    // @ts-ignore
    const settingsMenuRef = useRef<any>(null)

    const toggleMenu = () => {
        // navigate('settings/accessibility')
        settingsMenuRef.current.toggleMenu()
    }
    
    return (
        <>
            <CssBaseline />
            <AppBar position={"sticky"} className={"appBar"} style={{zIndex:1301}}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Typography variant={"h6"}>
                            <span className={globalClasses.brandName}>Senso</span>
                        </Typography>
                    </Box>
                    <IconButton
                        aria-label="Zeige Einstellungen für Barrierefreiheit"
                        sx={{backgroundColor: "#f2f2f2", color: 'black'}}
                        onClick={toggleMenu}>
                        <Icon baseClassName="material-icons-round">
                            settings_accessibility
                        </Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <AccessibilitySettingsMenu ref={settingsMenuRef} />
            <main>
                <Container maxWidth="sm">
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                        Willkommen zu Accessible Senso
                    </Typography>
                    <Typography variant={"h5"} align={"center"} color={"textSecondary"} paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Grid container spacing={2} justifyContent={"center"}>
                        <Grid item>
                            <PrimaryButton
                                variant={"contained"} size={"large"}
                                onClick={() => navigate('/Game')}>
                                Spiel starten
                            </PrimaryButton>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <footer>
                <span className={globalClasses.brandName}>Accessible Senso</span> <br />
                &copy; 2021 - 2022 Barrierefreiheit (Gruppe C) an der VFH
            </footer>
        </>
    )
}
export default observer(HomePageView);