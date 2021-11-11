import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

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
            minHeight: '160px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: theme.spacing('16px', '16px'),
            color: 'white',
            backgroundColor: 'black',
        },
    },
    brandName: {
        fontSize: 24,
        fontWeight: 700
    }
}));