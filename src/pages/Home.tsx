import React, {} from "react";
import {
    AppBar,
    Button as MUIButton,
    Container,
    CssBaseline, Grid,
    Toolbar,
    Typography
} from "@mui/material";

import { styled } from '@mui/system';
import "@fontsource/inter/700.css"

import {useGlobalStyles} from "../styles/tsx/styles.global";
import {Link} from "react-router-dom";

const BigButton = styled(MUIButton)`
  color: white;
  background-color: black;
  height: 64px;
  margin-top: 36px;
`;

export const HomePage = () => {
    const globalClasses = useGlobalStyles()
    return (
        <>
            <CssBaseline />
            <AppBar position="relative" className={"appBar"}>
                <Toolbar>
                    <Typography variant={"h6"}>
                        <span className={globalClasses.brandName}>Senso</span>
                    </Typography>
                </Toolbar>
            </AppBar>
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
                            <Link to={"/game"}>
                                <BigButton variant={"contained"} size={"large"}>
                                    Spiel starten
                                </BigButton>
                            </Link>
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