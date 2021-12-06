import React from "react";
import {
    Breadcrumbs, Button,
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

const AccessibilityHearingSettings = withAccessibilityContext(
  withAccessibilityMenuContext((props: any) => {
    const { menuContext } = props;
    const { accessibilityContext } = props;

    return (
      <Stack direction={"column"} className={"seeing-contentContainer"}>
        <header>
            <Button
                variant={"text"}
                aria-label={"Zurück zur Übersicht"}
                startIcon={<Icon baseClassName="material-icons-round">arrow_back</Icon>}
                onClick={() => {
                    menuContext.updateSelectedCategory();
                }}>
                Zurück zur Übersicht
            </Button>
            <Stack direction={"row"} alignItems={"center"} className={"headline"}>
            <Icon baseClassName="material-icons-round" className={"icon"}>
              hearing
            </Icon>
            <Typography variant={"h5"}>Hören</Typography>
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

export default AccessibilityHearingSettings;
