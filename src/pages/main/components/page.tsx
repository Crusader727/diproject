import './page.scss';
import * as React from 'react';
import * as ReactToPrint from 'react-to-print';
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
    _qrImageRef: HTMLAnchorElement | null = null;
    state: State = {
        isMenuShown: false,
        isShown: true
    }

    componentWillUnmount() {
        if (this.menuTimeout) {
            clearTimeout(this.menuTimeout);
        }
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
                `https://velox-qr.herokuapp.com/qr/${uuid}`
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

    render(): React.ReactNode {
        if (!this.state.isShown) {
            return null;
        }
        const {uuid, title, template, static: isStatic, public: isPublic} = this.props;
        const date = new Date(this.props.date);
        const now = new Date();
        const formatedDate = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 3600)) > 24 ?
            date.toDateString() :
            'Today at ' + date.toLocaleTimeString();
        const smallIcon = isStatic || template === 'html' || template === 'push' ?
            template : !isPublic ? 'private' : null;
        return (
            <div className="page">
                <div className="page__content">
                    <div className="page__content__qr">
                        <a
                            className="page__content"
                            href={`qr/${uuid}`}
                            target="_blank"
                            ref={el => (this._qrImageRef = el)}
                        >
                            <QRCode value={this._getQrCodeValue()} size={90} />
                        </a>
                    </div>
                    <div className="page__content__info">
                        <div className="page__content__info__title">
                            {title}                            
                        </div>
                        <div className="page__content__info__type">
                            {smallIcon ? smallIcon : 'custom'}
                            {smallIcon ?
                                <ReactSVG
                                    src={`/icons/templates/${smallIcon}.svg`}
                                    svgClassName="page__small-icon"
                                    tabIndex={0}
                                /> : null
                            }
                        </div>
                        <div className="page__content__info__date">
                            {formatedDate}
                            <ReactSVG
                                src={`/icons/datetime.svg`}
                                svgClassName="page__content__info__date__icon"
                                tabIndex={0}
                            />
                        </div>
                    </div>
                    <div className="page__content__actions">
                        {this.props.mine && !this.props.static && this.props.template !=='html' ?
                            <Link to={`/${this.props.uuid}/edit`} className="page__menu__edit-link">
                                <Button type="air" icon="edit" size="medium"/>
                            </Link> :
                            null
                        }
                        <Button type="air" icon="delete" onClick={this._deletePage} size="medium"/>
                    </div>
                </div>
                <div className="page__actions">
                    <ReactToPrint
                        trigger={() =>  <Button type="air" icon="print" text="Print" size="medium"/>}
                        content={() => this._qrImageRef}
                        bodyClass="print-page"
                    />
                    <Button
                        icon="download"
                        text="Download"
                        size="small"
                        downloadHref={this._downloadSVG()}
                        downloadTitle={this.props.title}
                    />
                </div>
            </div>
        );
    }
}