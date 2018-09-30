import './app.scss';

import * as React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Constructor from 'pages/constructor/constructor';
import MainPage from 'pages/main/main';

export default class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/new' component={Constructor}/>
                    <Route path='/' component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}