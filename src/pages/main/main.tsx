import './main.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg'
import Pages from './components/pages';
import Header from 'components/header/header';
import {getPages} from './main-provider';
import PageCut from 'types/pageCut';

const Templates = [{title: 'awd'}, {title: 'transport'}, {title: 'cv'}, {title: 'medical'}, {title: 'contacts'}, {title: 'contacts2'}];

interface State {
    isRightArrowShown: boolean;
    isLeftArrowShown: boolean;
    pages: PageCut[];
}

export default class MainPage extends React.Component {
    state: State = {
        isRightArrowShown: true,
        isLeftArrowShown: false,
        pages: []
    }

    componentDidMount() {
        getPages().then(
            (res) => res.json().then(pages => this.setState({pages}))
        ); //todo Error
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

    private _renderTemplate(title: string): React.ReactNode {
        return (
            <Link to="/new" className="template" key={title}>
                <div className="template__content">
                    <ReactSVG
                        src={`icons/cross.svg`}
                        svgClassName="cross"
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
                src={`icons/arrow-${type}.svg`}
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
                        {this._renderTemplate('custom')}
                        {this._renderArrow('left')}
                        <div className="main-page__templates__content__scrollable" onScroll={this._onTemplatesScroll}>
                            {Templates.map(({title}) => this._renderTemplate(title))}
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
                <Pages pages={this.state.pages}/>
            </div>
        );
    }
}
