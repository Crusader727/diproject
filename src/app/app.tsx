import './app.scss';

import * as React from "react";
import { BrowserRouter, Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom'

import Constructor from 'pages/constructor/constructor';
import MainPage from 'pages/main/main';
import Qr from 'pages/qr/qr';
import Login from 'pages/login/login';

interface State {
    isLoggedIn: boolean
}

export default class App extends React.Component {
    _redirectTo = (url: string, props: any) => (
        <Redirect
            to={{pathname: url, state: { from: props.location }}}
        />
    );
    state: State = {
        isLoggedIn: false
    }
    componentDidMount () {
        //HERE MUST BE WHOAMI
        this.setState({isLoggedIn: true});
    }
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
                                (<Login hash={props.location.hash}/>):
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