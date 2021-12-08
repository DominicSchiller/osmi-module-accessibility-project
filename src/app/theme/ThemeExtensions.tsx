declare module '@mui/material/styles' {
    interface Palette {
        footer: Palette['primary'];
        surface: string
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        footer?: PaletteOptions['primary'];
        surface?: string
    }
}

export {}