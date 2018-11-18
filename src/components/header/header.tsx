import './header.scss';
import * as React from 'react';
import {Link} from 'react-router-dom';
import Button from 'components/button/button';
import {logout} from './header-provider';

interface Props {
    username: string;
    logout: () => void;
}

export default class Header extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="header">
                <Link to="/">
                    <div className="header__title">Velox</div>
                </Link>
                <div className="header__right-block">
                    <div className="header__right-block__accaunt">
                        {this.props.username}                 
                    </div>
                    <Button
                        onClick={() => {
                            logout();
                            this.props.logout();
                        }}
                        text="logout"
                        type="air"
                        icon="exit"
                    />
                </div>
            </div>
        );
    }
}