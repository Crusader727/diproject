import './header.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/botton/button'

export default class Header extends React.Component {
    render(): React.ReactNode {
        return (
            <Link className="header" to="/">
                <div className="header__title">Velox</div>
                <Button text="Profile" type="air"/>
            </Link>
        );
    }
}