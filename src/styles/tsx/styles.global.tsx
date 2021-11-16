import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

/**
 * Default set of customized global styles.
 */
export const useGlobalStyles = makeStyles((theme: Theme) => createStyles ({
    '@global': {
        body: {
            backgroundColor: theme.palette.background.paper,
        },
        header: {
            color: 'black !important',
            backgroundColor: 'white !important',
        },
        main: {
            marginTop: 40
        },
        footer: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            minHeight: '128px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: theme.spacing('16px', '16px'),
            color: theme.palette.text.secondary,
            backgroundColor: '#f3f3f3',
        },
    },
    brandName: {
        fontSize: 24,
        fontWeight: 700
    }
}));

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