import './pages.scss';
import * as React from 'react';
import ReactSVG from 'react-svg'

import DropDown from 'components/dropdown/dropdown';
import Input from 'components/input/input';
import PageCut from 'types/pageCut';
import Page from './page';
import Stats from 'types/stats';

const sortActions = ['date', 'a-z', 'z-a'];
const ownerTypes = ['all', 'me', 'others'];

interface State {
    isSearchOpen: boolean;
}

interface Props {
    pages: PageCut[];
    searchValue: string;
    onSearchChange: (e: any) => void;
    getOwnerType: (value: string) => void;
    getSortValue: (value: string) => void;
    stats: Stats | null;
}

export default class Pages extends React.Component<Props> {
    state: State = {
        isSearchOpen: false
    }

    private _renderDropDownButton(
        {icon, items, onClick, className}:
        {icon: string, items: any[], onClick: (value: string) => void, className?: string})
    : React.ReactNode {
        return (
            <DropDown items={items} onClick={onClick} showChosen>
                <ReactSVG
                    src={`/icons/${icon}.svg`}
                    svgClassName={"icon" + (className ? `-${className}` : '')}
                />
            </DropDown>  
        );
    }

    private _renderSearch(): React.ReactNode {
        const {searchValue} = this.props;
        if (!this.state.isSearchOpen && searchValue === '') {          
            return (
                <ReactSVG
                    src="/icons/search.svg"
                    svgClassName="icon"
                    onClick={() => this.setState({isSearchOpen: true})}
                />
            );
        }
        return (
            <div className="search-bar" onBlur={() => this.setState({isSearchOpen: searchValue !== ''})}>
                <Input
                    size="large"
                    isAnimated
                    isFocused
                    placeholder="Search"
                    value={searchValue}
                    onChange={this.props.onSearchChange}
                />
            </div>
        );
    }

    _renderStats(): React.ReactNode {
        let {users, pages, views} = this.props.stats || {users: 0, pages: 0, views: 0};
        return (
            <div className="pages__stats">
                <div className="pages__stats__item _first">
                    <div className="pages__stats__item__count">
                        {users}
                    </div>
                    <div className="pages__stats__item__title">
                        Total users registered
                    </div>
                </div>
                <div className="pages__stats__item _second">
                    <div className="pages__stats__item__count">
                        {pages}
                    </div>
                    <div className="pages__stats__item__title">
                        Total QRs created
                    </div>
                </div>
                <div className="pages__stats__item _third">
                    <div className="pages__stats__item__count">
                        {views}
                    </div>
                    <div className="pages__stats__item__title">
                        Total QRs scanned
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {pages, searchValue} = this.props;
        return (
            <div className="pages">
                {this._renderStats()}
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
                            items: ownerTypes,
                            onClick: this.props.getOwnerType,
                            className: 'owner'
                        })
                        }
                        {this._renderDropDownButton({
                            icon: 'sort',
                            items: sortActions,
                            onClick: this.props.getSortValue,
                            className: 'owner'
                        })
                        }
                    </div>
                </div>
                <div className="pages__content">
                    {pages.length ?
                        pages.map((page) => <Page {...page} key={page.uuid}/>) :
                        <div>
                            {searchValue === '' ? 'You dont have any pages yet.' : 'No search results'}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
