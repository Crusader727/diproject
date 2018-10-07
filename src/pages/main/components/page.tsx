import './page.scss';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Link } from 'react-router-dom';
import * as QRCode from 'qrcode.react';
import ReactSVG from 'react-svg';
import Button from 'components/button/button';
import {deletePage} from './page-provider';
import PageCut from 'types/pageCut';


interface State {
    isMenuShown: boolean;
    isShown: boolean;
}

export default class Page extends React.Component<PageCut> {
    state: State = {
        isMenuShown: false,
        isShown: true
    }

    private _deletePage = (): void => {
        deletePage(this.props.id).then(
            () => this.setState({isShown: false}),
            () => console.log('error')//TODO error
        );
    }

    private _downloadSVG = (): string => {
        let svg = renderToString(
            <QRCode value={`https://velox-app.herokuapp.com/qr/${this.props.id}`} size={130} renderAs="svg"/>
        );
        svg = svg.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        svg = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        return svg;
    }

    private _renderMenu(): React.ReactNode {
        if (!this.state.isMenuShown) {
            return null;
        }
        return (
            <div className="page__menu">
                <Link to={`/${this.props.id}/edit`}>
                    <Button type="air" icon="edit" />
                </Link>
                <Button type="air" icon="delete" onClick={this._deletePage}/>
                <Button type="air" icon="print"/>
                <Button
                    type="air"
                    icon="download"
                    downloadHref={this._downloadSVG()}
                    downloadTitle={this.props.title}
                />
            </div>
        );
    }

    render(): React.ReactNode {
        if (!this.state.isShown) {
            return null;
        }
        const {id, title} = this.props;
        const date = new Date(this.props.date);
        const now = new Date();
        const formatedDate = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 3600)) > 24 ?
            date.toDateString() :
            date.toLocaleTimeString();
        return (
            <div className="page">
                <a className="page__content" href={`qr/${id}`} target="_blank">
                    <QRCode value={`https://velox-app.herokuapp.com/qr/${id}`} size={130}/>
                </a>
                {this._renderMenu()}
                <div className="page__title">
                    <div className="page__title__left-block">
                        <div>
                            {title}
                        </div>
                        <div className="page__title__date">
                            {formatedDate}
                        </div>
                    </div>
                    <ReactSVG
                        src="icons/more.svg"
                        svgClassName="page__icon"
                        tabIndex={0}
                        onBlur={() => setTimeout(() => this.setState({isMenuShown: false}), 200)}
                        onClick={() => this.setState({isMenuShown: !this.state.isMenuShown})}
                    />
                </div>
            </div>
        );
    }
}