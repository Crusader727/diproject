import './login.scss';
import * as React from 'react';
import * as qs from 'qs';
import ReactSVG from 'react-svg';
import {sendToken} from './login-provider';
import {yandexId, googleId, vkId} from 'core/config/config';
import Loader from 'components/loader/loader';
import Button from 'components/button/button';

interface Props {
    hash: string;
    loginFunction: () => void;
    service?: string;
}

const services = [{
        name: 'yandex',
        url: `https://oauth.yandex.ru/authorize?response_type=token&client_id=${yandexId}`
    }, {
        name: 'google',
        url: 'https://accounts.google.com/o/oauth2/v2/auth?' +
        'scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&' +
        'state=state_parameter_passthrough_value&'+
        'redirect_uri=https://velox-qr.herokuapp.com/login/google&response_type=token&client_id=' + googleId
        // url: 'https://accounts.google.com/o/oauth2/v2/auth?' +
        // 'scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&' +
        // 'state=state_parameter_passthrough_value&'+
        // 'redirect_uri=http://localhost:8000/login/google&response_type=token&client_id=' + googleId
    }, {
        name: 'vk',
        url: `https://oauth.vk.com/authorize?client_id=${vkId}&redirect_uri=https://velox-qr.herokuapp.com/login/vk&response_type=token&v=5.92`
    }
]

export default class Login extends React.Component<Props> {
    state = {
        isLoading: false
    }
    componentDidMount() {
        const params = qs.parse(this.props.hash.slice(1), {ignoreQueryPrefix: true});
        const {access_token, error} = params;
        const {service} = this.props;
        if (access_token) {
            this.setState({isLoading: true})
            sendToken(access_token, service).then(
                () => {
                    this.setState({isLoading: false});
                    this.props.loginFunction();
                },
                () => this.setState({isLoading: false})//error
            );
        }
    }

    private _renderLoader(): React.ReactNode {
        if (!this.state.isLoading) {
            return null;
        }
        return (
            <div className="login__loader">
                <Loader size="large"/>
            </div>
        );
    }

    render(): React.ReactNode {
        return (
            <>
                {this._renderLoader()}
                <div className={"login" + (this.state.isLoading ? ' _isloading' : '')}>
                    <div className="login__heading">
                        <div className="login__heading__content">
                            <div className="login__heading__content__title">
                                Velox
                            </div>
                            <div className="login__heading__content__description">
                                Create and manage your QR codes
                            </div>
                            <div className="login__heading__content__subdescription">
                                We provide solutions that make your life better!
                            </div>
                        </div>
                    </div>
                    <div className="login__content">
                        <div className="login__content__title">
                            Our Features
                        </div>
                        <div className="login__content__underline" />
                        <div className="login__content__features">
                            <div className="login__content__features__item">
                                <ReactSVG
                                    src={`/icons/features/qr.svg`}
                                    svgClassName="feature-icon"
                                />
                                <div className="login__content__features__item__text">
                                    QRs come in
                                    <br/>
                                    Handy
                                </div>
                            </div>
                            <div className="login__content__features__item">
                                <ReactSVG
                                    src={`/icons/features/menu.svg`}
                                    svgClassName="feature-icon"
                                />
                                <div className="login__content__features__item__text">
                                    Customize your own
                                    <br/>
                                    Action menu
                                </div>
                            </div>
                            <div className="login__content__features__item">
                                <ReactSVG
                                    src={`/icons/features/trust.svg`}
                                    svgClassName="feature-icon"
                                />
                                <div className="login__content__features__item__text">
                                    We protect
                                    <br/>
                                    Your information
                                </div>
                            </div>
                            <div className="login__content__features__item">
                                <ReactSVG
                                    src={`/icons/features/stack.svg`}
                                    svgClassName="feature-icon"
                                />
                                <div className="login__content__features__item__text">
                                    Up–to–date
                                    <br/>
                                    Tech stack
                                </div>
                            </div>
                        </div>
                        <div className="login__content__singins__title">
                            Sign in to try it out
                        </div>
                        <div className="login__content__singins">
                            <Button
                                text="Sign in with Google" 
                                icon="oauth/google"
                                size="large"
                                onClick={() =>
                                    {window.open(services[1].url, "_self")}
                                }
                            />
                            <Button
                                text="Sign in with Yandex" 
                                icon="oauth/yandex"
                                size="large"
                                onClick={() =>
                                    {window.open(services[0].url, "_self")}
                                }
                            />
                            <Button
                                text="Sign in with Vkontakte" 
                                icon="oauth/vk"
                                size="large"
                                onClick={() =>
                                    {window.open(services[2].url, "_self")}
                                }
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}