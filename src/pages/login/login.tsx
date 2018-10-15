import './login.scss';
import * as React from 'react';
import * as qs from 'qs';
import ReactSVG from 'react-svg';
import {sendToken} from './login-provider';
import {yandexId} from 'core/config/config';
import Loader from 'components/loader/loader';

interface Props {
    hash: string;
    loginFunction: () => void;
}

export default class Login extends React.Component<Props> {
    state = {
        isLoading: false
    }
    componentDidMount() {
        const params = qs.parse(this.props.hash.slice(1), {ignoreQueryPrefix: true});
        const {access_token, error} = params;
        if (access_token) {
            this.setState({isLoading: true})
            sendToken(access_token).then(
                () => {
                    this.props.loginFunction();
                    this.setState({isLoading: false});
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
                        <div className="login__content__title">
                            Please Sign In with one of the Services
                        </div>
                        <div className="login__content__services">
                            <ReactSVG
                                src={`/icons/oauth/yandex.svg`}
                                svgClassName="oauth-icon"
                                onClick={() =>
                                    {window.open(`https://oauth.yandex.ru/authorize?response_type=token&client_id=${yandexId}`, "_self")}
                                }
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}