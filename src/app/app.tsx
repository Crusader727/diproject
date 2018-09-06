import * as React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ComponentsList from 'pages/components-list/components-list';

export default class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={ComponentsList}/>
                </Switch>
            </BrowserRouter>
        );
    }
}