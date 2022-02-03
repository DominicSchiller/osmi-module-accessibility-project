import React from "react";
import {
  Button as MUIButton,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/inter/700.css";
import { useGlobalStyles } from "../../../styles/tsx/styles.global";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import "./Home.scss"

const PrimaryButton = styled(MUIButton)`
  height: 64px;
  margin-top: 36px;
`;

const HomePageView = () => {
  const navigate = useNavigate();
  const globalClasses = useGlobalStyles();

  return (
      <>
        <CssBaseline />
        <Grid
            container
            component={"main"}
            direction={"column"}
            flexGrow={"1"}
            rowGap={{ xs: 6, sm: 3 }}
            sx={{
              padding: {
                xs: "24px 8px 0 8px",
                md: "32px 8px 0 8px",
                xl: "40px 8px 0 8px"
              }
            }}>
          <Typography
              variant="h1"
              align="center"
              color="textPrimary">
            Willkommen bei Senso
          </Typography>
          <Typography
              variant={"body1"}
              align={"center"}
              color={"textSecondary"}
              sx={{fontSize: "1.2rem"}}
              paragraph>
              Versuche Dir die Reihenfolge der angezeigten Symbole oder Farben zu merken.<br />
              ... na, aufgepasst?! ... Konntest Du Dir alle merken?<br />
              Dann wiederhole die Reihenfolge der Farben und Symbole.<br />
              <br />
              Geschafft? Dann auf zur nächsten Runde.<br />
              <br />
              Wenn Du die Spieloberfläche nach deinen Bedürfnissen anpassen möchtest, <br />
              findest du oben rechts Deine Einstellungsmöglichkeiten.
          </Typography>
          <Grid container
                id={"video-container"}
                spacing={2}
                flexDirection={{
                    xs: "column",
                    lg: "row"
                }}
                justifyContent={"center"}
                alignContent={"center"}
                alignItems={{
                    xs: "center",
                    md: "center",
                    lg: "end"
                }}
                columnGap={"24px"}
                sx={{marginBottom: "32px"}}>
              <iframe width="640" height="360"
                      src="https://www.youtube.com/embed/57RP_ztLU68?rel=0&showinfo=0&autoplay=1&controls=1"
                      title="Tutorial-Video: So spielst du Senso"
                      allow="autoplay" allowFullScreen />
              <PrimaryButton
                  variant={"contained"}
                  size={"large"}
                  aria-label={"Starte ein neues Spiel"}
                  onClick={() => navigate("/Game")}>
                  Spiel starten
              </PrimaryButton>
          </Grid>
        </Grid>
        <footer>
          <Typography>
            <span className={globalClasses.brandName}>Accessible Senso</span>{" "}
            <br />
            &copy; 2021 – 2022 Barrierefreiheit (Gruppe C) an der VFH
          </Typography>
        </footer>
      </>

  );
};
export default observer(HomePageView);
