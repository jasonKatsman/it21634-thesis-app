import React, {FC, memo} from 'react';
import {Box, Grid, IconButton, makeStyles, Theme, Typography, useTheme} from "@material-ui/core";
import {ReactComponent as VlIcon} from "../../images/vegaLiteWhite.svg";
import {ReactComponent as MaterialIcon} from "../../images/material-ui.svg";

import reactLogo from "../../images/logo192.png";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: (props: any) => props.height,
        display: 'flex',
        background: theme.palette.primary.main,
        padding: '0 16px',
        color: 'whitesmoke'
    },
    padding: {
        padding: '16px',
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
            <Grid className={classes.padding} container justify={'center'} alignItems={'center'}>
                <Grid item xs={12} container justify={'space-evenly'} wrap={'nowrap'}>
                    <a href={'https://www.coingecko.com/api/documentations/v3'} target="_blank">
                        <Typography
                            align={'center'}>API USED: <strong>COINGECKO</strong>
                        </Typography>
                    </a>
                </Grid>
                <a href={'https://reactjs.org/'} target="_blank">
                    <IconButton>
                        <img src={reactLogo} width={35} height={35}/>
                    </IconButton>
                </a>
                <a href={'https://mui.com/'} target="_blank">
                    <IconButton style={{margin: '0 24px'}}>
                        <MaterialIcon width={35} height={35}/>
                    </IconButton>
                </a>
                <a href={'https://vega.github.io/vega-lite/'} target="_blank">
                    <IconButton>
                        <VlIcon width={35} height={35}/>
                    </IconButton>
                </a>

                <Grid item  xs={12}>
                    <Typography align={'center'}>Page made by <strong>Jason Katsoutas</strong></Typography>
                </Grid>

            </Grid>
        </Box>
    );
}

export default memo(Footer);
