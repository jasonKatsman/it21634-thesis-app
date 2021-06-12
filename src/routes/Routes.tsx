import React, {FC} from 'react';
import {Route, Switch} from "react-router";
import Home from "../pages/Home";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Home}/>
        </Switch>
    );
}

export default Routes;
