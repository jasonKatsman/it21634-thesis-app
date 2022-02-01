import React, {FC} from 'react';
import {Route, Switch} from "react-router";
import DataPage from "../pages/DataPage";
import CreatePage from "../pages/CreatePage";
import CompareCoinPage from "../pages/CompareCoinPage";
import CoinPreviewPage from "../pages/CoinPreviewPage";
import CoinSelectedPage from "../pages/CoinSelectedPage";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path={'/create'} component={CreatePage}/>
            <Route exact path={'/compare'} component={CompareCoinPage}/>
            <Route exact path={'/'} component={CoinPreviewPage}/>
            <Route exact path={'/preview'} component={CoinPreviewPage}/>
            <Route exact path={'/preview/:id?'} component={CoinSelectedPage}/>
        </Switch>
    );
}

export default Routes;
