/**
 * The app's global user interface color mode
 */
import {PaletteMode} from "@mui/material";

export enum UIColorMode {
    /**
     * The light mode
     */
    Light = "light",
    /**
     * The dark mode
     */
    Dark = "dark",
    /**
     * The monochrome (grayscale) mode
     */
    Monochrome = "monochrome"
}

export namespace UIColorMode {
    /**
     * Get the MUI palette mode from given UI color mode
     * @param colorMode The UI color mode to get the MUI palette mode from
     */
    export function paletteMode(colorMode: UIColorMode): PaletteMode {
        switch (colorMode) {
            case UIColorMode.Dark:
                return "dark"
            default:
                return "light"
        }
    }
}