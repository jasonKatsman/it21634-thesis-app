import React, {FC, useState} from 'react';
import {Box, Drawer, Grid, IconButton, makeStyles, Theme, useMediaQuery, useTheme} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CustomButtonBig from "../common/CustomButtonBig";
import {Home} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: (props: any) => props.height,
        display: 'flex',
        background: 'white',
        padding: '0 16px',
        position: 'relative',
        zIndex: 20,
        boxShadow: '0 0 12px 4px lightgray',

    },
    rightLinks: {
        display: 'flex',
        alignItems: 'center',
        '& > :nth-child(n)': {
            marginRight: 32,
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
    drawerButton: {
        marginRight: 16,
        marginLeft: "auto",
    }
}))

interface headerProps {
    height?: number;
}

const Header: FC<headerProps> = ({height = 60}) => {
    const classes = useStyles({height});
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box className={classes.root}>
            {smUp && <Grid container justify={'space-between'} alignItems={'center'}>
                <NavLink to={'/'} exact={true} className={classes.link}
                         activeClassName={classes.activeLink}><Home style={{margin:'0 6px'}}/>HOME</NavLink>
                <Box className={classes.rightLinks}>
                    <NavLink to={'/create'} className={classes.extra}
                             activeClassName={classes.extra}>
                        <CustomButtonBig>Create a chart </CustomButtonBig>
                    </NavLink>
                    <NavLink to={'/help'} className={classes.link} activeClassName={classes.activeLink}>
                        Help</NavLink>
                </Box>
            </Grid>}
            <Drawer open={isOpen && !smUp} anchor={'right'} onClose={() => setIsOpen(false)}>
                DRAWER
            </Drawer>

            {!smUp && <IconButton
                className={classes.drawerButton}
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon/>
            </IconButton>}
        </Box>
    );
}

export default Header;
