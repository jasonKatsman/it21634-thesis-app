import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import Layout from "./components/structural/Layout";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "./theme";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes/>
                </Layout>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
