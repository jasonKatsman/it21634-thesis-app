import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import Layout from "./components/structural/Layout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes/>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
