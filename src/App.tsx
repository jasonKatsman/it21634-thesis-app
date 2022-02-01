import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import Layout from "./components/structural/Layout";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "./theme";
import store, {persistor} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Layout>
                            <Routes/>
                        </Layout>
                    </BrowserRouter>
                </MuiThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
