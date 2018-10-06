import './app.scss';

import * as React from "react";
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom'

import Constructor from 'pages/constructor/constructor';
import MainPage from 'pages/main/main';
import Qr from 'pages/qr/qr';
import Login from 'pages/login/login';

export default class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path='/qr/:id'
                        render={(props: RouteComponentProps<{id: string}>) => (<Qr id={props.match.params.id}/>)}
                    />
                    <Route
                        path='/login'
                        render={(props) => (<Login qs={props.location.search}/>)}
                    />
                    <Route
                        path='/new/:type'
                        render={(props: RouteComponentProps<{type: string}>) =>
                            (<Constructor type={props.match.params.type}/>)}
                    />
                    <Route path='/' component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}