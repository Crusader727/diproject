import './main.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg'
import Pages from './components/pages';
import Header from 'components/header/header';
import {getPages} from './main-provider';
import PageCut from 'types/pageCut';

const Templates = [
    {title: 'wifi', type: 'wifi'}, 
];

interface State {
    isRightArrowShown: boolean;
    isLeftArrowShown: boolean;
    pages: PageCut[];
    searchValue: string; 
}

export default class MainPage extends React.Component {
    state: State = {
        isRightArrowShown: true,
        isLeftArrowShown: false,
        searchValue: '',
        pages: []
    }

    componentDidMount() {
        getPages({}).then(
            (res) => res.json().then(pages => this.setState({pages}))
        ); //todo Error
    }

    private _onSearchChange = (e: any) => {
        const value = e.target.value;
        this.setState({searchValue: value});
        getPages({search: value}).then(
            (res) => res.json().then(pages => this.setState({pages}))
        );
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

    private _renderArrow(type: string): React.ReactNode {
        let style = {};
        const flag = type === 'left' ? this.state.isLeftArrowShown : this.state.isRightArrowShown;
        if (!flag) {
            style = {opacity: 0.2}
        }
        return (
            <ReactSVG
                src={`/icons/arrow-${type}.svg`}
                className="arrow-container"
                svgClassName="arrow"
                style={style}
            />
        );
    }

    

    private _renderTemplates(): React.ReactNode {
        return (
            <>
                <Header />
                <div className="main-page__templates">
                    <div className="main-page__templates__title">
                        Templates
                    </div>
                    <div className="main-page__templates__content">
                        {this._renderTemplate('custom', 'custom')}
                        {this._renderArrow('left')}
                        <div className="main-page__templates__content__scrollable" onScroll={this._onTemplatesScroll}>
                            {Templates.map(({title, type}) => this._renderTemplate(title, type))}
                        </div>
                        {this._renderArrow('right')}
                    </div>
                </div>
            </>
        );
    }

    public render() {
        return (
            <div className="main-page">
                {this._renderTemplates()}
                <Pages
                    pages={this.state.pages}
                    sorts={{search: {
                            value: this.state.searchValue,
                            onChange: this._onSearchChange
                        }}
                    }
                />
            </div>
        );
    }
}
