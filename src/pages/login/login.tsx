import './login.scss';
import * as React from 'react';
import * as qs from 'qs';
import {sendCode} from './login-provider';

interface Props {
    qs: string
}

export default class Login extends React.Component<Props> {
    componentDidMount() {
        const code = qs.parse(this.props.qs, {ignoreQueryPrefix: true}).code;
        sendCode(code);
    }

    render(): React.ReactNode {
        console.log(qs.parse(this.props.qs, {ignoreQueryPrefix: true}));
        return (
            <div className="login">
                <a href="https://oauth.yandex.ru/authorize?response_type=code&client_id=&display=popup">xuy</a>
            </div>
        );
    }
}