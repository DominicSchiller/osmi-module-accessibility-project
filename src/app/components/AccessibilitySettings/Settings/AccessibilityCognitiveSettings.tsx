import React from "react";
import {
  Breadcrumbs,
  Icon,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { withAccessibilityMenuContext } from "../../../context/AccessibilityMenuContext";
import { withAccessibilityContext } from "../../../context/AccessibilityContext";
import "./AccessibilityCategorySettings.scss";
import { rgbaString } from "../../../../utils/ColorUtils";

const AccessibilityCognitiveSettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const { menuContext } = props;
    const { accessibilityContext } = props;

    return (
      <Stack direction={"column"} className={"seeing-contentContainer"}>
        <header>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton
              aria-label="Zurück zum Einstellungen Menü"
              color={"primary"}
              sx={{
                backgroundColor: rgbaString(
                  accessibilityContext.primaryColor,
                  0.1
                ),
                marginRight: "8px",
              }}
              onClick={() => {
                menuContext.updateSelectedCategory();
              }}
            >
              <Icon baseClassName="material-icons-round">arrow_back</Icon>
            </IconButton>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={
                <>
                  <Icon
                    baseClassName="material-icons-round"
                    sx={{ fontSize: "16px" }}
                  >
                    arrow_forward_ios
                  </Icon>
                </>
              }
            >
              <Link
                underline="hover"
                color="inherit"
                href={"#"}
                onClick={() => {
                  menuContext.updateSelectedCategory();
                }}
              >
                Einstellungen der Barrierefreiheit
              </Link>
            </Breadcrumbs>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} className={"headline"}>
            <Icon baseClassName="material-icons-round" className={"icon"}>
              psychology
            </Icon>
            <Typography variant={"h5"}>Schwierigkeit</Typography>
          </Stack>
        </header>

        <main>
          <Typography variant="body1">
            Einstellungen werden hier bald verfügbar sein.
          </Typography>
        </main>
      </Stack>
    );
  })
);

export default AccessibilityCognitiveSettings;
