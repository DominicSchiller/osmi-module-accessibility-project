import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

/**
 * Default set of customized global styles.
 */
export const useGlobalStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      body: {
        backgroundColor: theme.palette.background.paper,
      },
      header: {
        color: `${theme.palette.text.primary} !important`,
        backgroundColor: `${theme.palette.background.paper} !important`,
      },
      main: {
        flex: "1",
      },
      footer: {
        bottom: 0,
        width: "100%",
        minHeight: "128px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: theme.spacing("16px", "16px"),
        color: theme.palette.text.secondary,
        // backgroundColor: "#f3f3f3",
        backgroundColor: theme.palette.footer.main
      },

      ".page-container": {
        // position: "absolute",
        [theme.breakpoints.up("xs")]: {
          marginTop: "24px",
          minHeight: "calc(100% - 80px)", // 56px of header bar + spacing of 24px
        },
        [theme.breakpoints.up("xs")]: {
          marginTop: "32px",
          minHeight: "calc(100% - 88px)", // 56px of header bar + spacing of 32px
        },
        [theme.breakpoints.up("md")]: {
          marginTop: "48px",
          minHeight: "calc(100% - 112px)", // 64px of header bar + spacing of 48px
        },
        [theme.breakpoints.up("xl")]: {
          marginTop: "64px",
          minHeight: "calc(100% - 128px)", // 64px of header bar + spacing of 64px
        },
      },
      h1: {
        [theme.breakpoints.up("xs")]: {
          fontSize: "3rem !important",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "3rem !important",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "4rem !important",
        },
        [theme.breakpoints.up("xl")]: {
          fontSize: "5rem !important",
        },
      },

      h4: {
        [theme.breakpoints.up("xs")]: {
          fontSize: "1rem !important",
        },
        [theme.breakpoints.up("sm")]: {
          fontSize: "1.5rem !important",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "2.5rem !important",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "3rem !important",
        },
        [theme.breakpoints.up("xl")]: {
          fontSize: "3.5rem !important",
        },
      },

      button: {
        [theme.breakpoints.up("xs")]: {
          textTransform: "none !important",
        },
        [theme.breakpoints.up("md")]: {
          textTransform: "none !important",
        },
        [theme.breakpoints.up("lg")]: {
          textTransform: "none !important",
        },
        [theme.breakpoints.up("xl")]: {
          textTransform: "none !important",
        },
      },
    },
    brandName: {
      fontSize: 24,
      fontWeight: 700,
    },
  })
);

// export const useStyles = makeStyles(theme => ({
//     root: {
//         // @ts-ignore
//         background: ({color})=> color,
//     },
//     testMe: {
//         // @ts-ignore
//         background: ({color})=> color,
//     }
// }));
