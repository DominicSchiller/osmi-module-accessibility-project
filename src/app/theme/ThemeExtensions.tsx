declare module '@mui/material/styles' {
    interface Palette {
        footer: Palette['primary'];
        surface: string,
        tooltip: TooltipPaletteOptions,
        scoringStar: ScoringStarPaletteOptions
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        footer?: PaletteOptions['primary'];
        surface?: string;
        tooltip?: TooltipPaletteOptions;
        scoringStar?: ScoringStarPaletteOptions;

    }

    interface ScoringStarPaletteOptions {
        empty?: string
        filled?: string
    }

    interface TooltipPaletteOptions {
        background?: string
        text?: string
    }
}

export {}