import React from "react";
import {
    Button as MUIButton,
    Container,
    CssBaseline, Grid,
    Typography
} from "@mui/material";
import { styled } from '@mui/system';
import "@fontsource/inter/700.css"
import {useGlobalStyles} from "../../../styles/tsx/styles.global";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

const PrimaryButton = styled(MUIButton)`
  height: 64px;
  margin-top: 36px;
`;

const HomePageView = () => {
    const navigate = useNavigate();
    const globalClasses = useGlobalStyles();
    
    return (
        <Grid container direction={"column"} rowGap={{xs: 6, sm: 3}} className={"page-container"}>
            <CssBaseline />
            <main>
                <Container maxWidth="md">
                    <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                        Willkommen zu Accessible Senso
                    </Typography>
                    <Typography variant={"h5"} align={"center"} color={"textSecondary"} paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Grid container spacing={2} justifyContent={"center"}>
                        <Grid item>
                            <PrimaryButton
                                variant={"contained"} size={"large"}
                                onClick={() => navigate("/Game")}>
                                Spiel starten
                            </PrimaryButton>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <footer>
                <Typography>
                    <span className={globalClasses.brandName}>Accessible Senso</span> <br />
                    &copy; 2021 - 2022 Barrierefreiheit (Gruppe C) an der VFH
                </Typography>
            </footer>
        </Grid>
    )
};
export default observer(HomePageView);