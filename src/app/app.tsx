import * as React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Input from 'components/input/input';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Input}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;