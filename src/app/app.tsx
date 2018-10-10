import './app.scss';

import * as React from "react";
import { BrowserRouter, Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom'

import Constructor from 'pages/constructor/constructor';
import MainPage from 'pages/main/main';
import Qr from 'pages/qr/qr';
import Login from 'pages/login/login';
import {getUser} from 'pages/login/login-provider';

interface State {
    isLoggedIn: boolean
}

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {isLoggedIn: false};
        getUser().then( //loader
            () => this.setState({isLoggedIn: true}),
            () => {},//error handling
        );
    }
    _redirectTo = (url: string, props: any) => (
        <Redirect
            to={{pathname: url, state: { from: props.location }}}
        />
    );
    public render() {
        const {isLoggedIn} = this.state;
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path='/qr/:id'
                        render={(props: RouteComponentProps<{id: string}>) => (<Qr id={props.match.params.id}/>)}
                    />
                    <Route
                        path='/login'
                        render={(props) =>
                            !isLoggedIn ?
                                (<Login hash={props.location.hash} loginFunction={() => this.setState({isLoggedIn: true})}/>):
                                this._redirectTo('/', this.props)
                        }
                    />
                    <Route
                        path='/new/:type'
                        render={(props: RouteComponentProps<{type: string}>) =>
                            isLoggedIn ?
                                (<Constructor type={props.match.params.type}/>):
                                this._redirectTo('/login', this.props)
                            }
                    />
                    <Route
                        path='/:id/edit'
                        render={(props: RouteComponentProps<{id: string}>) =>
                            isLoggedIn ?
                                (<Constructor id={props.match.params.id}/>):
                                this._redirectTo('/login', this.props)
                            }
                    />
                    <Route path='/' 
                        render={() =>
                            isLoggedIn ?
                                (<MainPage />):
                                this._redirectTo('/login', this.props)
                        }
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}