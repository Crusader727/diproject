import './login.scss';
import * as React from 'react';
import * as qs from 'qs';
import ReactSVG from 'react-svg';
import {sendCode} from './login-provider';
import {yandexId} from '../../core/config/config';

interface Props {
    hash: string
}

export default class Login extends React.Component<Props> {
    componentDidMount() {
        const params = qs.parse(this.props.hash.slice(1), {ignoreQueryPrefix: true});
        const {access_token, error} = params;
        console.log(error);
        console.log(access_token);
        // sendCode(code);
    }

    render(): React.ReactNode {
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
                        <ReactSVG
                            src={`icons/oauth/yandex.svg`}
                            svgClassName="oauth-icon"
                            onClick={() =>
                                {window.open(`https://oauth.yandex.ru/authorize?response_type=token&client_id=${yandexId}`, "_self")}
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}