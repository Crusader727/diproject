import './pages.scss';
import * as React from 'react';
import ReactSVG from 'react-svg'

import DropDown from 'components/dropdown/dropdown';
import Input from 'components/input/input';

const pages = [
    {title: 'first', url: 'url'},
    {title: 'second', url: 'url'},
    {title: 'third', url: 'url'},
    {title: 'forth', url: 'url'}
];

interface State {
    isSearchOpen: boolean;
}

export default class Pages extends React.Component {
    state: State = {
        isSearchOpen: false
    }

    private _renderSortButton(): React.ReactNode {
        const items = [
            {name: 'awd', onClick: () => console.log('awd')},
            {name: 'awd1', onClick: () => console.log('awd1')},
            {name: 'awd2', onClick: () => console.log('awd2')}
        ]
        return (
            <DropDown items={items}>
                <ReactSVG
                    src="icons/sort.svg"
                    svgClassName="icon"
                    onClick={() => console.log('sort')}
                />
            </DropDown>  
        );
    }

    private _renderSearch(): React.ReactNode {
        if (!this.state.isSearchOpen) {          
            return (
                <ReactSVG
                    src="icons/search.svg"
                    svgClassName="icon"
                    onClick={() => this.setState({isSearchOpen: true})}
                />
            );
        }
        return (
            <div className="search-bar" onBlur={() => this.setState({isSearchOpen: false})}>
                <Input size="large" isAnimated isFocused placeholder="Search"/>
            </div>
        );
    }

    private _renderPage(title: string, url: string) {
        return (
            <div className="page" key={title}>
                <div className="page__content">
                    
                </div>
                <div className="page__title">
                    {title}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="pages">
                <div className="pages__header">
                    <div className="pages__header__left-block">
                        <div className="pages__header__title">
                            Pages
                        </div>
                        {this._renderSearch()}
                    </div>
                    {this._renderSortButton()}
                </div>
                <div className="pages__content">
                    {pages.length ?
                        pages.map(({title, url}) => this._renderPage(title, url)) :
                        <div>
                            You dont have any pages yet.
                        </div>
                    }
                </div>
            </div>
        );
    }
}