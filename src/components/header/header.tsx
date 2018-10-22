import './header.scss';
import * as React from 'react';
import {Link} from 'react-router-dom';
import DropDown from 'components/dropdown/dropdown';
import {logout} from './header-provider';

interface Props {
    username: string;
}

export default class Header extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="header">
                <Link to="/">
                    <div className="header__title">Velox</div>
                </Link>
                <DropDown onClick={() => logout()} items={['logout']} hideArrow>
                    {this.props.username}
                </DropDown>
            </div>
        );
    }
}