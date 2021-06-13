import React, {FC} from 'react';
import {Route, Switch} from "react-router";
import Home from "../pages/Home";
import Indicators from "../pages/Indicators";
import DataPage from "../pages/DataPage";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/indicators'} component={Indicators}/>
            <Route exact path={'/data/:id?'} component={DataPage}/>

        </Switch>
    );
}

export default Routes;
