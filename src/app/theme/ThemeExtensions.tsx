declare module '@mui/material/styles' {
    interface Palette {
        footer: Palette['primary'];
        surface: string,
        scoringStar: ScoringStarPaletteOptions
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        footer?: PaletteOptions['primary'];
        surface?: string;
        scoringStar?: ScoringStarPaletteOptions;

    }

    interface ScoringStarPaletteOptions {
        empty?: string
        filled?: string
    }
}

export {}