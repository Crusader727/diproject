import './pages.scss';
import * as React from 'react';
import ReactSVG from 'react-svg'

import DropDown from 'components/dropdown/dropdown';
import Input from 'components/input/input';
import PageCut from 'types/pageCut';
import Page from './page';

const sortActions = [
    {name: 'A-Z', onClick: () => console.log('awd')},
    {name: 'Z-A', onClick: () => console.log('awd1')},
    {name: 'Date', onClick: () => console.log('awd2')},
];

interface State {
    isSearchOpen: boolean;
    ownerTypeIndex: number;
}

interface Props {
    pages: PageCut[];
}

export default class Pages extends React.Component<Props> {
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
                    src={`/icons/${icon}.svg`}
                    svgClassName={"icon" + (className ? `-${className}` : '')}
                    onClick={() => console.log('sort')}
                />
            </DropDown>  
        );
    }

    private _renderSearch(): React.ReactNode {
        if (!this.state.isSearchOpen) {          
            return (
                <ReactSVG
                    src="/icons/search.svg"
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

    render() {
        const {pages} = this.props;
        return (
            <div className="pages">
                <div className="pages__header">
                    <div className="pages__header__block">
                        <div className="pages__header__title">
                            Pages
                        </div>
                        {this._renderSearch()}
                    </div>
                    <div className="pages__header__block">
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
                        pages.map((page) => <Page {...page} key={page.uuid}/>) :
                        <div>
                            You dont have any pages yet.
                        </div>
                    }
                </div>
            </div>
        );
    }
}
