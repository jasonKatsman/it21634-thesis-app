import React, {FC} from 'react';
import {Box, Grid, makeStyles, Theme, Typography, useTheme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: (props: any) => props.height,
        display: 'flex',
        background: theme.palette.primary.main,
        padding: '0 16px',
        color: 'whitesmoke'
    }
}))

interface FooterProps {
    height?: number;
}

const Footer: FC<FooterProps> = ({height = 60}) => {
    const classes = useStyles({height});
    const theme = useTheme();

    return (
        <Box className={classes.root}>
            <Grid container justify={'center'} alignItems={'center'}>
                <Grid item xs={12}>
                    <Typography align={'center'}>Page made by Jason Katsoutas</Typography>
                </Grid>
                <Grid item container justify={'center'} wrap={'nowrap'}>
                    <Typography align={'center'} style={{marginRight:32}}>tools used: ReactJS - Material UI - VEGA LITE</Typography>
                    <Typography align={'center'}>Cryptocurrency data by coingecko</Typography>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Footer;
