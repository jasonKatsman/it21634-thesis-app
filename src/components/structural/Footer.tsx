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
                <Grid item xs={12} container justify={'space-evenly'} wrap={'nowrap'}>
                    <a href={'https://reactjs.org/'} target="_blank">
                        <Typography align={'center'}>
                            <strong>ReactJS</strong>
                        </Typography>
                    </a>
                    <a href={'https://vega.github.io/vega-lite/'} target="_blank">
                        <Typography align={'center'}>
                            <strong>VEGA LITE</strong>
                        </Typography>
                    </a>
                    <a href={'https://mui.com/'} target="_blank">
                        <Typography align={'center'}>
                            <strong>MATERIAL UI</strong>
                        </Typography>
                    </a>
                </Grid>
                <Grid item xs={12} container justify={'space-evenly'} wrap={'nowrap'}>
                    <a href={'https://www.coingecko.com/api/documentations/v3'} target="_blank">
                        <Typography
                            align={'center'}>Api used: <strong>COINGECKO</strong>
                        </Typography>
                    </a>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Footer;
