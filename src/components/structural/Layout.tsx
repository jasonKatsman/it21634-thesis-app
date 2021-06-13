import React, {FC} from 'react';
import {Box, Container, makeStyles} from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
    root: {
        background: 'lightcoral'

    },
    container: {
        height: (props: any) => `calc(100vh - ${props.headerHeight}px)`,
        overflow: 'auto'
    },
    childContainer: {
        minHeight: (props: any) => `calc(100% - ${props.footerHeight}px)`,
    }

}))
const headerHeight = 60
const footerHeight = 90
const Layout: FC = ({children}) => {
    const classes = useStyles({headerHeight, footerHeight});
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
