import React, {FC} from 'react';
import {Box, Container, makeStyles} from "@material-ui/core";
import Header from "./Header";

const useStyles = makeStyles(() => ({
    root: {
        background: 'lightcoral'

    },
    container: {
        height: (props: any) => `calc(100vh - ${props.headerHeight}px)`,
        overflow:'auto'
    },

}))
const headerHeight = 60

const Layout: FC = ({children}) => {
    const classes = useStyles({headerHeight});
    return (
        <Box className={classes.root}>
            <Header height={headerHeight}/>
            <Container className={classes.container} maxWidth={'lg'} children={children!}/>
        </Box>
    );
}

export default Layout;
