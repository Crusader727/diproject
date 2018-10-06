import './login.scss';
import * as React from 'react';
import * as qs from 'qs';
import ReactSVG from 'react-svg';
import {sendCode} from './login-provider';
import {yandexId} from '../../core/config/config';

interface Props {
    qs: string
}

export default class Login extends React.Component<Props> {
    componentDidMount() {
        const code = qs.parse(this.props.qs, {ignoreQueryPrefix: true}).code;
        // sendCode(code);
    }

    render(): React.ReactNode {
        console.log(qs.parse(this.props.qs, {ignoreQueryPrefix: true}));
        return (
            <div className="login">
                <div className="login__content">
                    <div className="login__content__title">
                        Welcome to Velox
                    </div>
                    <div className="login__content__title">
                        Please Sign In with one of Services
                    </div>
                    <div className="login__content__services">
                    {/* <a href="https://oauth.yandex.ru/authorize?response_type=code&client_id=&display=popup">adw</a> */}
                        <ReactSVG
                            src={`icons/oauth/yandex.svg`}
                            svgClassName="oauth-icon"
                            onClick={() =>
                                {window.open(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${yandexId}&display=popup`, "_self")}
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}