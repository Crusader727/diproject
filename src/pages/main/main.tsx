import './main.scss';
import * as React from 'react';
import ReactSVG from 'react-svg'
import Button from 'components/botton/button';
import Input from 'components/input/input';

const Templates = [{title: 'awd'}, {title: 'transport'}, {title: 'cv'}, {title: 'medical'}, {title: 'contacts'}, {title: 'contacts2'}];
const Pages: string[] = [];

interface State {
    isSearchOpen: boolean;
    isRightArrowShown: boolean;
    isLeftArrowShown: boolean;
}

export default class MainPage extends React.Component {
    state: State = {
        isSearchOpen: false,
        isRightArrowShown: true,
        isLeftArrowShown: false
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
            <div className="template" key={title}>
                <div className="template-content">
                    
                </div>
                <div className="template-title">
                    {title}
                </div>
            </div>
        );
    }

    private _renderSearch(): React.ReactNode {
        if (!this.state.isSearchOpen) {          
            return (
                <ReactSVG
                    src="icons/search.svg"
                    svgClassName="search-icon"
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

    public render() {
        return (
            <div className="main-page">
                <div className="main-page-header">
                    <div className="main-page-header-title">Velox</div>
                    <Button text="Profile" type="air"/>
                </div>
                <div className="main-page-templates">
                    <div className="main-page-templates-title">
                        Templates
                    </div>
                    <div className="main-page-templates-content">
                        {this._renderTemplate('custom')}
                        {this._renderArrow('left')}
                        <div className="main-page-templates-content-scrollable" onScroll={this._onTemplatesScroll}>
                            {Templates.map(({title}) => this._renderTemplate(title))}
                        </div>
                        {this._renderArrow('right')}
                    </div>
                </div>
                <div className="main-page-pages">
                    <div className="main-page-pages-header">
                        <div className="main-page-pages-header-left-block">
                            <div className="main-page-pages-header-title">
                                Pages
                            </div>
                            {this._renderSearch()}
                        </div>
                        <div>
                            btn
                        </div>
                    </div>
                    <div className="main-page-pages-content">
                        {Pages.length ? 'xuy' : 'You dont have any pages yet'}
                    </div>
                </div>
            </div>
        );
    }
}