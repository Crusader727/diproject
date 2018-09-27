import './app.scss';

import * as React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ComponentsList from 'pages/components-list/components-list';
import MainPage from 'pages/main/main';

export default class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/cl' component={ComponentsList}/>
                    <Route path='/' component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}