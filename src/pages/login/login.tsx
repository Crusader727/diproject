import './login.scss';
import * as React from 'react';
import * as qs from 'qs';
import ReactSVG from 'react-svg';
import {sendToken} from './login-provider';
import {yandexId, googleId} from 'core/config/config';
import Loader from 'components/loader/loader';

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
        'redirect_uri=http://localhost:8000/login/google&response_type=token&client_id=' + googleId
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
                    <div className="login__content">
                        <div className="login__content__title">
                            Welcome to Velox
                        </div>
                        <div className="login__content__text">
                            Velox is a web-services that allows you to generate QR codes for
                            templates and custom pages, static and dynamic Qr Codes.
                            Editor has a function of adding several actions into one QR. Authorize to try it!  
                        </div>
                        <div className="login__content__services">
                            {services.map(service => (
                                <ReactSVG
                                    className="oauth-icon__container"
                                    key={service.name}
                                    src={`/icons/oauth/${service.name}.svg`}
                                    svgClassName="oauth-icon"
                                    onClick={() =>
                                        {window.open(service.url, "_self")}
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}