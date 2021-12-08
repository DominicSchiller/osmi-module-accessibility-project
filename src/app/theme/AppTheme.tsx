import {Theme} from "@mui/material/styles/createTheme";
import {AccessibilityProps} from "../../models/accessibility/AccessibilityProps";
import {Palette, PaletteOptions} from "@mui/material/styles/createPalette";
import {TypographyOptions} from "@mui/material/styles/createTypography";
import {UIColorMode} from "../../models/accessibility/seeing/SeeingAccessibilityProps";
import {Components, createTheme, lighten} from "@mui/material";

/**
 * The global app's theme.
 */
export default class AppTheme {
    /**
     * Create the app's theme based on current accessibility properties.
     * @param accessibilityProps The set of accessibility properties to create the theme based on
     * @return The theme
     */
    public static create(accessibilityProps: AccessibilityProps): Theme {
        const palette = this.createPalette(accessibilityProps)

        return createTheme({
            typography: {...this.createTypographyOptions(accessibilityProps)},
            palette: {...palette},
            components: {...this.createComponentOverrides(palette)}
        });
    }

    /**
     * Create the theme's color palette.
     * @param accessibilityProps The set of accessibility properties to create the color palette based on
     * @private
     */
    private static createPalette(accessibilityProps: AccessibilityProps): PaletteOptions {
        const { palette } = createTheme();

        switch (accessibilityProps.uiColorMode) {
            case UIColorMode.Dark:
                return this.createDarkModePalette(palette, accessibilityProps)
            default:
                return this.createLightModePalette(palette, accessibilityProps)
        }
    }

    /**
     * Create a color palette for light mode.
     * @param basePalette The MUI base color palette
     * @param accessibilityProps The set of accessibility properties to create the light mode color palette based on
     * @private
     */
    private static createLightModePalette(basePalette: Palette, accessibilityProps: AccessibilityProps): PaletteOptions {
        return {
            mode: UIColorMode.paletteMode(accessibilityProps.uiColorMode),
            primary: {
                main: accessibilityProps.primaryColor,
            },
            footer: {
                main: basePalette.grey[100]
            },
            surface: basePalette.grey[100],
            contrastThreshold: 3
        }
    }

    /**
     * Create a color palette for dark mode.
     * @param basePalette The MUI base color palette
     * @param accessibilityProps The set of accessibility properties to create the dark mode color palette based on
     * @private
     */
    private static createDarkModePalette(basePalette: Palette, accessibilityProps: AccessibilityProps): PaletteOptions {
        return {
            mode: UIColorMode.paletteMode(accessibilityProps.uiColorMode),
            primary: {
                main: accessibilityProps.primaryColor,
            },
            footer: {
                main: lighten(basePalette.grey[900], 0.05)
            },
            surface: lighten(basePalette.grey[900], 0.05),
            contrastThreshold: 3
        }
    }

    /**
     * Create all typography related options.
     * @param accessibilityProps The set of accessibility properties to create typography options based on
     * @private
     */
    private static createTypographyOptions(accessibilityProps: AccessibilityProps): TypographyOptions {
        return {
            fontFamily: accessibilityProps.fontFamily
        }
    }

    /**
     * Create custom MUI component overrides.
     * @param palette The current color palette options which to use for component overrides.
     * @private
     */
    private static createComponentOverrides(palette: PaletteOptions): Components {
        return {
            MuiListSubheader: {
                styleOverrides: {
                    root: {
                        fontWeight: "bold"
                    }
                }
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        minHeight: "64px",
                        borderRadius: "16px",
                        backgroundColor: palette.surface!
                    }
                }
            },
            MuiToggleButtonGroup: {
                styleOverrides: {
                    root: {
                        // ".Mui-selected": {
                        //     backgroundColor: `${accessibilityProps.primaryColor} !important`
                        // }
                    }
                }
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: "36px",
                        ".MuiIcon-root": {
                            fontSize: "32px"
                        }
                    },
                }
            },
            MuiButton: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        minHeight: 64,
                        textTransform: "uppercase"
                    },
                },
            }
        }
    }
}


