import {Theme} from "@mui/material/styles/createTheme";
import {AccessibilityProps} from "../../models/accessibility/AccessibilityProps";
import {Palette, PaletteOptions} from "@mui/material/styles/createPalette";
import {TypographyOptions} from "@mui/material/styles/createTypography";
import {UIColorMode} from "../../models/accessibility/seeing/UIColorMode";
import {Components, createTheme, lighten} from "@mui/material";
import {UIContrastMode} from "../../models/accessibility/seeing/UIContrastMode";

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

        switch (accessibilityProps.seeing.uiColorMode) {
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
            mode: UIColorMode.paletteMode(accessibilityProps.seeing.uiColorMode),
            primary: {
                main: accessibilityProps.seeing.primaryColor,
            },
            footer: {
                main: accessibilityProps.seeing.uiContrastMode === UIContrastMode.HighContrast ? '#ffffff' : basePalette.grey[100]
            },
            surface: accessibilityProps.seeing.uiContrastMode === UIContrastMode.HighContrast ? '#ffffff' : basePalette.grey[100],
            ...(accessibilityProps.seeing.uiContrastMode === UIContrastMode.HighContrast ? {
                text: {
                    primary: '#000000',
                    secondary: '#000000'
                },
                background: {
                    default: '#ffffff',
                    paper: '#ffffff'
                }
            } : {}),
            action: {
                disabled: `${this.getDisabledColor(accessibilityProps)}`
            },
            contrastThreshold: 3,
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
            mode: UIColorMode.paletteMode(accessibilityProps.seeing.uiColorMode),
            primary: {
                main: accessibilityProps.seeing.primaryColor,
            },
            footer: {
                main: accessibilityProps.seeing.uiContrastMode === UIContrastMode.HighContrast ? '#000000' : lighten(basePalette.grey[900], 0.05)
            },
            surface: accessibilityProps.seeing.uiContrastMode === UIContrastMode.HighContrast ? '#000000' : lighten(basePalette.grey[900], 0.05),
            ...(accessibilityProps.seeing.uiContrastMode === UIContrastMode.HighContrast ? {
                text: {
                    primary: '#ffffff',
                    secondary: '#ffffff'
                },
                background: {
                    default: '#000000',
                    paper: '#000000'
                },
                action: {
                    disabled: 'rgba(0, 0, 0, 0.4)'
                }
            } : {}),
            action: {
                disabled: `${this.getDisabledColor(accessibilityProps)}`
            },
            contrastThreshold: 3
        }
    }

    private static getDisabledColor(accessibilityProps: AccessibilityProps): string {
        let alpha = 0
        let color = 0

        switch (accessibilityProps.seeing.uiContrastMode) {
            case UIContrastMode.HighSaturation:
                alpha = 0.5
                break
            case UIContrastMode.HighContrast:
                alpha = 0.4
                break
            case UIContrastMode.LowSaturation:
                alpha = 0.36
                break
            default:
                alpha = 0.3
        }
        return `rgba(${color}, ${color}, ${color}, ${alpha})`
    }

    /**
     * Create all typography related options.
     * @param accessibilityProps The set of accessibility properties to create typography options based on
     * @private
     */
    private static createTypographyOptions(accessibilityProps: AccessibilityProps): TypographyOptions {
        return {
            fontFamily: accessibilityProps.seeing.fontFamily
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


