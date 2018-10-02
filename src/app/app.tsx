import './app.scss';

import * as React from "react";
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom'

import Constructor from 'pages/constructor/constructor';
import MainPage from 'pages/main/main';
import Qr from 'pages/qr/qr';

export default class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path='/qr/:id'
                        render={(props: RouteComponentProps<{id: string}>) => (<Qr id={props.match.params.id}/>)}
                    />
                    <Route path='/new' component={Constructor}/>
                    <Route path='/' component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}