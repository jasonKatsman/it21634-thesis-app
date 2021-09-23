import React, {FC} from 'react';
import {Route, Switch} from "react-router";
import Home from "../pages/Home";
import DataPage from "../pages/DataPage";
import CreatePage from "../pages/CreatePage";
import TestPage from "../pages/TestPage";
import CompareCoinPage from "../pages/CompareCoinPage";
import CoinPreviewPage from "../pages/CoinPreviewPage";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path={'/createData'} component={DataPage}/>
            <Route exact path={'/create'} component={CreatePage}/>
            <Route exact path={'/compare'} component={CompareCoinPage}/>
            <Route exact path={'/help'} component={TestPage}/>
            <Route exact path={'/'} component={CoinPreviewPage}/>
            <Route exact path={'/preview'} component={CoinPreviewPage}/>
        </Switch>
    );
}

export default Routes;
