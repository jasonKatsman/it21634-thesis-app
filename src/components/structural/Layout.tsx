import React, {FC, useEffect} from 'react';
import {Box, Container, makeStyles} from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import {useLocation} from "react-router";

const useStyles = makeStyles(() => ({
    root: {
        background: 'white'

    },
    container: {
        height: (props: any) => `calc(100vh - ${props.headerHeight}px)`,
        overflow: 'auto',
        background: '#f6f6f6'
    },
    childContainer: {
        minHeight: (props: any) => `calc(100% - ${props.footerHeight}px)`,

    }

}))
const headerHeight = 80
const footerHeight = 150
const Layout: FC = ({children}) => {
    const classes = useStyles({headerHeight, footerHeight});
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Box className={classes.root}>
            <Header height={headerHeight}/>
            <Box className={classes.container}>
                <Container maxWidth={'xl'} className={classes.childContainer} children={children!}/>
                <Footer height={footerHeight}/>
            </Box>
        </Box>
    );
}

export default Layout;
