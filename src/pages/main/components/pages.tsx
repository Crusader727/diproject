import './pages.scss';
import * as React from 'react';
import ReactSVG from 'react-svg'
import * as QRCode from 'qrcode.react';

import DropDown from 'components/dropdown/dropdown';
import Input from 'components/input/input';

const pages = [
    {title: 'first', url: 'url'},
    {title: 'second', url: 'urlewadadawdawdawd1'},
    {title: 'third', url: 'url2'},
    {title: 'forth', url: 'url3'},
    {title: '1', url: 'url4'},
    {title: '2', url: 'ur123'},
    {title: '3', url: 'urawdl'},
    {title: '4', url: 'uradl'},
    {title: '5', url: 'ur`cl'},
    {title: '6', url: 'url'},
    {title: '7', url: 'ur23dgl'},
    {title: '8', url: 'url'},
    {title: '9', url: 'uradjnl'},
    {title: '10', url: 'url'},
    {title: '11', url: 'url'},
    {title: '12', url: 'url'},
    {title: '13', url: 'url'},
    {title: '14', url: 'url'},
    {title: '15', url: 'url'},
];

const pageActions = [
    {name: 'Print', onClick: () => console.log('awd')},
    {name: 'Download', onClick: () => console.log('awd1')},
    {name: 'Edit', onClick: () => console.log('awd2')},
    {name: 'Delete', onClick: () => console.log('awd2')}
];

const sortActions = [
    {name: 'A-Z', onClick: () => console.log('awd')},
    {name: 'Z-A', onClick: () => console.log('awd1')},
    {name: 'Date', onClick: () => console.log('awd2')},
];

interface State {
    isSearchOpen: boolean;
    ownerTypeIndex: number;
}

export default class Pages extends React.Component {
    state: State = {
        isSearchOpen: false,
        ownerTypeIndex: 0
    }

    ownerTypes = [
        {name: 'All', onClick: () => this.setState({ownerTypeIndex: 0})},
        {name: 'Me', onClick: () => this.setState({ownerTypeIndex: 1})},
        {name: 'Others', onClick: () => this.setState({ownerTypeIndex: 2})},
    ];

    private _renderDropDownButton(
        {icon, items, chosenIndex, className}:
        {icon: string, items: any[], chosenIndex?: number, className?: string})
    : React.ReactNode {
        return (
            <DropDown items={items} chosenIndex={chosenIndex}>
                <ReactSVG
                    src={`icons/${icon}.svg`}
                    svgClassName={"icon" + (className ? `-${className}` : undefined)}
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
                <Input size="larger" isAnimated isFocused placeholder="Search"/>
            </div>
        );
    }

    private _renderPage(title: string, url: string) {
        return (
            <div className="page" key={title}>
                <div className="page__content">
                    <QRCode value={url} size={130}/>
                </div>
                <div className="page__title">
                    <div>
                        {title}
                    </div>
                    {this._renderDropDownButton({icon: 'more', items: pageActions, className: 'more'})}
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
                    <div>
                        {this._renderDropDownButton({
                            icon: 'owner',
                            items: this.ownerTypes,
                            chosenIndex: this.state.ownerTypeIndex,
                            className: 'owner'
                        })
                        }
                        {this._renderDropDownButton({icon: 'sort', items: sortActions})}
                    </div>
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
