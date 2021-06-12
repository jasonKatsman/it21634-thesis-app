import React, {FC, useState} from 'react';
import {Box, Drawer, Grid, IconButton, makeStyles, useMediaQuery, useTheme} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
    root: {
        height: (props: any) => props.height,
        display: 'flex',
        background: 'lightblue',
        padding: '0 16px'
    },
    rightLinks: {
        display: 'flex',
        '& > :nth-child(n)': {
            padding: 15,
        }
    },
    link: {
        color: 'black',
        fontWeight: 600,
        textDecoration: 'none',
    },
    activeLink: {
        transition: '0.2s',
        color: 'red'
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
                <NavLink to={'/'} className={classes.link} activeClassName={classes.activeLink}>HOME</NavLink>
                <Box className={classes.rightLinks}>
                    <NavLink to={'/csv'} className={classes.link} activeClassName={classes.activeLink}>
                        ONLINE DATA
                    </NavLink>
                    <NavLink to={'/more'} className={classes.link} activeClassName={classes.activeLink}> ADD YOUR CSV
                    </NavLink>
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
