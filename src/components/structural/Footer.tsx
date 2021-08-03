import React, {FC, useState} from 'react';
import {Box, Grid, makeStyles, Theme, Typography, useMediaQuery, useTheme} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => ({
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
                <Typography>Test. Made by JASON KATS.</Typography>
            </Grid>
        </Box>
    );
}

export default Footer;
