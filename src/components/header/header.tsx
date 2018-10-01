import './header.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/button/button'

export default class Header extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="header">
                <Link to="/">
                    <div className="header__title">Velox</div>
                </Link>
                <Button text="Profile" type="air"/>
            </div>
        );
    }
}