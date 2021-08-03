import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';
import {createMuiTheme} from "@material-ui/core";

export const themeOptions: ThemeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#02254b',
            light: '#4e4eb9',
        },
        secondary: {
            main: '#72621d',
        },
        error: {
            main: '#81120e',
        },
    },
};

export const theme = createMuiTheme({
    ...themeOptions
});