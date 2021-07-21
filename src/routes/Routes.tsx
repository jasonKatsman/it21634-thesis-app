import React, {FC} from 'react';
import {Route, Switch} from "react-router";
import Home from "../pages/Home";
import DataPage from "../pages/DataPage";
import CreatePage from "../pages/CreatePage";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path={'/createData'} component={DataPage}/>
            <Route exact path={'/create'} component={CreatePage}/>

            <Route exact path={'/'} component={Home}/>
        </Switch>
    );
}

export default Routes;
