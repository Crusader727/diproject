import './app.scss';

import * as React from "react";
import { BrowserRouter, Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom'

import Constructor from 'pages/constructor/constructor';
import MainPage from 'pages/main/main';
import Qr from 'pages/qr/qr';
import Login from 'pages/login/login';
import {getUser} from 'pages/login/login-provider';
import subscribeOnNotification from './push-notification';

interface State {
    isLoggedIn: boolean;
    username: string;
}

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: 'Profile'
        };
        this._login();
    }
    private _logout = () => {
        window.localStorage.clear();
        navigator.serviceWorker.getRegistrations().then(
                function(registrations) {
                    for(let registration of registrations) {  
                        registration.unregister();
            
                    }
            });
        this.setState({isLoggedIn: false});        
    }
    private _login = () => {
        getUser().then( //loader
            ({message}) => {
                this.setState({isLoggedIn: true, username: message});
                subscribeOnNotification();
            },
            () => {this.setState({isLoggedIn: false})},//error handling
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
                        path='/login/:service'
                        render={(props: RouteComponentProps<{service: string}>) =>
                            !isLoggedIn ?
                                (<Login
                                    hash={props.location.hash}
                                    loginFunction={this._login}
                                    service={props.match.params.service}
                                />):
                                this._redirectTo('/', this.props)
                        }
                    />
                    <Route
                        path='/login'
                        render={(props) =>
                            !isLoggedIn ?
                                (<Login
                                    hash={props.location.hash}
                                    loginFunction={this._login}
                                />):
                                this._redirectTo('/', this.props)
                        }
                    />
                    <Route
                        path='/new/:type'
                        render={(props: RouteComponentProps<{type: string}>) =>
                            isLoggedIn ?
                                (<Constructor
                                    type={props.match.params.type}
                                    username={this.state.username}
                                    logout={this._logout}
                                />):
                                this._redirectTo('/login', this.props)
                            }
                    />
                    <Route
                        path='/:id/edit'
                        render={(props: RouteComponentProps<{id: string}>) =>
                            isLoggedIn ?
                                (<Constructor
                                    id={props.match.params.id} 
                                    username={this.state.username}
                                    logout={this._logout}
                                />):
                                this._redirectTo('/login', this.props)
                            }
                    />
                    <Route path='/' 
                        render={() =>
                            isLoggedIn ?
                                (<MainPage
                                    username={this.state.username}
                                    logout={this._logout}
                                />):
                                this._redirectTo('/login', this.props)
                        }
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}