import './main.scss';
import * as React from 'react';
// import { SketchPicker } from 'react-color'
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg'
import Pages from './components/pages';
import Header from 'components/header/header';
import {getPages, getStats} from './main-provider';
import PageCut from 'types/pageCut';
import Stats from 'types/stats';

interface Props {
    username: string;
    logout: () => void;
}

interface State {
    isRightArrowShown: boolean;
    isLeftArrowShown: boolean;
    pages: PageCut[];
    searchValue: string;
    stats: Stats | null;
}

const Templates = [
    {title: 'wifi', type: 'wifi'}, 
    {title: 'telephone', type: 'telephone'}, 
    {title: 'SMS', type: 'sms'},
    {title: 'event', type: 'event'},
    {title: 'Maps Location', type: 'ylocation'},
    {title: 'Custom HTML', type: 'html'},
    {title: 'URL', type: 'url'},
    {title: 'Email', type: 'email'},
    {title: 'WhatsApp', type: 'whatsapp'},
    {title: 'Contact', type: 'contact'},
    {title: 'Notification', type: 'push'}
];

export default class MainPage extends React.Component<Props> {
    _ownerType = 'all';
    _sortValue = 'date';
    state: State = {
        isRightArrowShown: true,
        isLeftArrowShown: false,
        searchValue: '',
        pages: [],
        stats: null,
    }
    componentDidMount() {
        this._getPages();
    }

    private _getPages(search?: string) {
        getPages(
            {
                search: search !== undefined ? search : this.state.searchValue,
                sort: this._sortValue,
                own: this._ownerType
            }
        ).then(
            pages => this.setState({pages}),
            () => this.setState({pages: []})
        );// error
        getStats().then(stats => this.setState({stats}, () => {}));
    }

    private _onSearchChange = (e: any) => {
        const value = e.target.value;
        this.setState({searchValue: value});
        this._getPages(value);
    }

    private _onTemplatesScroll = (e: any): void => {
        const position = e.target.scrollLeft + e.target.offsetWidth;
        if (position === e.target.scrollWidth) {
            this.setState({isRightArrowShown: false});
        } else if (position < e.target.scrollWidth - 10 && position > e.target.scrollWidth - 30) {
            this.setState({isRightArrowShown: true});
        }
        if (!e.target.scrollLeft) {
            this.setState({isLeftArrowShown: false});
        } else if (e.target.scrollLeft > 0 && e.target.scrollLeft < 20) {
            this.setState({isLeftArrowShown: true});
        }
    }

    private _renderTemplate(title: string, type: string): React.ReactNode {
        return (
            <Link to={`/new/${type}`} className="template" key={title}>
                <div className="template__content">
                    <ReactSVG
                        src={`/icons/templates/${type}.svg`}
                        svgClassName="template-icon"
                    />
                </div>
                <div className="template__title">
                    {title}
                </div>
            </Link>
        );
    }

    private _renderTemplates(): React.ReactNode {
        return (
            <div className="main-page__templates">
                <div className="main-page__templates__title">
                    Templates
                </div>
                <div className="main-page__templates__content">
                    {this._renderTemplate('custom', 'custom')}
                    <div className="main-page__templates__content__scrollable" onScroll={this._onTemplatesScroll}>
                        {Templates.map(({title, type}) => this._renderTemplate(title, type))}
                    </div>
                </div>
            </div>
        );
    }

    public render() {
        return (
            <div className="main-page">
                <Header username={this.props.username} logout={this.props.logout}/>
                <div className="main-page__content">
                    {this._renderTemplates()}
                    <Pages
                        pages={this.state.pages}
                        searchValue={this.state.searchValue}
                        onSearchChange={this._onSearchChange}
                        stats={this.state.stats}
                        getOwnerType={value => {
                            this._ownerType = value;
                            this._getPages();
                        }}
                        getSortValue={value => {
                            this._sortValue = value;
                            this._getPages();
                        }}
                    />
                </div>
            </div>
        );
    }
}
