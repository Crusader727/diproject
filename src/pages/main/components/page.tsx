import './page.scss';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {Link}  from 'react-router-dom';
import * as QRCode from 'qrcode.react';
import ReactSVG from 'react-svg';
import Button from 'components/button/button';
import {deletePage} from './page-provider';
import PageCut from 'types/pageCut';
import StaticQrGens from './static-qr-gens';

interface State {
    isMenuShown: boolean;
    isShown: boolean;
}

export default class Page extends React.Component<PageCut> {
    menuTimeout: any = null;
    state: State = {
        isMenuShown: false,
        isShown: true
    }

    componentWillUnmount() {
        if (this.menuTimeout) {
            clearTimeout(this.menuTimeout);
        }
    }
    private _printDiv = () => {
        var printContents = document.getElementById(this.props.uuid).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    private _deletePage = (): void => {
        deletePage(this.props.uuid).then(
            () => this.setState({isShown: false}),
            () => console.log('error')//TODO error
        );
    }

    private _getQrCodeValue(): string {
        const {uuid, fieldsNames, fieldsValues, title, template} = this.props;
        if (template && template !== 'custom' && template !== 'html' && template !== 'push') {
            return StaticQrGens[template](fieldsValues);
        }
        return (
            this.props.static ?
                `${title}\n${fieldsNames.map((el, i) => '\n' + el + ': ' + fieldsValues[i])}`:
                `https://velox-app.herokuapp.com/qr/${uuid}`
        );
    }

    private _downloadSVG = (): string => {
        let svg = renderToString(
            <QRCode value={this._getQrCodeValue()} size={130} renderAs="svg"/>
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
                {this.props.mine && !this.props.static && this.props.template !=='html' ?
                    <Link to={`/${this.props.uuid}/edit`}>
                        <Button type="air" icon="edit" />
                    </Link> :
                    null
                }
                <Button type="air" icon="delete" onClick={this._deletePage}/>
                <Button type="air" icon="print" onClick={this._printDiv}/>
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
        const {uuid, title, template, static: isStatic, public: isPublic} = this.props;
        const date = new Date(this.props.date);
        const now = new Date();
        const formatedDate = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 3600)) > 24 ?
            date.toDateString() :
            date.toLocaleTimeString();
        const smallIcon = isStatic || template === 'html' || template === 'push' ?
            template : !isPublic ? 'private' : null;
        return (
            <div className="page">
                <a className="page__content" href={`qr/${uuid}`} target="_blank" id={uuid}>
                    <QRCode value={this._getQrCodeValue()} size={130} renderAs="svg" />
                </a>
                {this._renderMenu()}
                <div className="page__title">
                    <div className="page__title__left-block">
                        <div className="page__title__title">
                            <div className="page__title__title__text">
                                {title}
                            </div>
                            {smallIcon ?
                                <ReactSVG
                                    src={`/icons/templates/${smallIcon}.svg`}
                                    svgClassName="page__small-icon"
                                    tabIndex={0}
                                /> : null
                            }
                        </div>
                        <div className="page__title__date">
                            {formatedDate}
                        </div>
                    </div>
                    <ReactSVG
                        src="/icons/more.svg"
                        svgClassName="page__icon"
                        tabIndex={0}
                        onBlur={() => this.menuTimeout = setTimeout(() => this.setState({isMenuShown: false}), 200)}
                        onClick={() => this.setState({isMenuShown: !this.state.isMenuShown})}
                    />
                </div>
            </div>
        );
    }
}