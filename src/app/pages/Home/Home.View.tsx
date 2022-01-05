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
              paddingTop: {
                xs: "24px",
                md: "48px",
                xl: "64px"
              }
            }}>
          <Typography
              variant="h1"
              align="center"
              color="textPrimary"
              gutterBottom>
            Willkommen zu Accessible Senso
          </Typography>
          <Typography
              variant={"h5"}
              align={"center"}
              color={"textSecondary"}
              paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item>
              <PrimaryButton
                  variant={"contained"}
                  size={"large"}
                  aria-label={"Starte ein neues Spiel"}
                  onClick={() => navigate("/Game")}
              >
                Spiel starten
              </PrimaryButton>
            </Grid>
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
