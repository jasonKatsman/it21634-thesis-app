import React, {FC, useState} from 'react';
import {Box, Grid, makeStyles, Typography, useMediaQuery, useTheme} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        height: (props: any) => props.height,
        display: 'flex',
        background: '#343434',
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
    const [isOpen, setIsOpen] = useState(false);
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box className={classes.root}>
            <Grid container justify={'center'} alignItems={'center'}>
                <Typography>Test. Made by JASON KATS.</Typography>
            </Grid>
        </Box>
    );
}

export default Footer;
