import React, {FC} from 'react';
import {Grid, makeStyles, Theme} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import CustomButtonBig from "../common/CustomButtonBig";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '60vw',
        paddingTop: 32,
        '&>:nth-child(n)': {
            marginBottom: 40
        }
    },
    link: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    },
    extra: {
        color: 'white',
        fontWeight: 600,
        textDecoration: 'none',
        padding: 0
    },
    activeLink: {
        transition: '0.2s',
        color: theme.palette.secondary.main,

    },
}))

interface headerProps {
    onCloseClick: () => void
}

const HeaderDrawer: FC<headerProps> = ({onCloseClick}) => {
    const classes = useStyles();


    return (
        <Grid onClick={onCloseClick} container className={classes.root}>
            <Grid item container justify={'center'} xs={12}>
                <NavLink to={'/'} exact={true} className={classes.link}
                         activeClassName={classes.activeLink}>
                    HOME
                </NavLink>
            </Grid>
            <Grid item container justify={'center'} xs={12}>
                <NavLink to={'/compare'} className={classes.link} activeClassName={classes.activeLink}>
                    COMPARE
                </NavLink>

            </Grid>
            <Grid item container justify={'center'} xs={12}>
                <NavLink to={'/create'}
                         className={classes.extra}
                         activeClassName={classes.extra}
                >
                    <CustomButtonBig>Create a chart </CustomButtonBig>
                </NavLink>
            </Grid>

        </Grid>
    );
}

export default HeaderDrawer;
