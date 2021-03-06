import './qr.scss';
import * as React from 'react';
import PageCut from 'types/pagecut';
import PageFull from 'types/PageFull';
import {getQr, sendPush} from './qr-provider';
import {Link} from 'react-router-dom';
import StaticQrGens from 'pages/main/components/static-qr-gens';
import ReactSVG from 'react-svg';

interface Props {
    id: string
}

interface State {
    page: PageFull | PageCut | null;
    isNotAvilable: boolean;
    menuID: string | null;
    isSuccessfullPush: boolean | null;
}

export default class Qr extends React.Component<Props> {
    state: State = {
        page: null,
        isNotAvilable: false,
        menuID: null,
        isSuccessfullPush: null
    }

    componentDidMount() { //todo loader
        getQr(this.props.id).then(
            (page) => this.setState({page}),
            () => this.setState({isNotAvilable: true})
        );
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.id !== prevProps.id) {
            getQr(this.props.id).then(
                (page) => this.setState({page, menuID: prevProps.id}),
                () => this.setState({isNotAvilable: true})
            );
        }
    }

    private _sendPush() {
        sendPush(this.props.id).then(
            () => this.setState({isSuccessfullPush: true}),
            () => this.setState({isSuccessfullPush: false}),
        );
    }

    private _renderItem(name: string, value: string, index: number) {
        return (
            <div key={index} className="qr__custom__content__item">
                <div className="qr__custom__content__item__title">
                    {name}
                </div>
                <div className="qr__custom__content__item__text">
                    {value}
                </div>
            </div>
        );
    }

    private _render404(): React.ReactNode {
        return (
            <div className="qr__not-found">
                <div className="qr__not-found__404">
                    404
                </div>
                <div className="qr__not-found__text">
                    This page is Private or Deleted
                </div>
            </div>
        );
    }

    private _renderHTML(value: string): React.ReactNode {
        return (
            <div className="qr__html">
                <iframe
                    srcDoc={value}
                    sandbox=""
                    width="100%"
                    height="100%"
                    frameBorder="false"
                />
            </div>
        );
    }

    private _renderCustom(page: PageCut): React.ReactNode {
        const {title, fieldsNames, fieldsValues} = page;
        const {menuID} = this.state;
        return (
            <div className="qr">
                <div className="qr__custom">
                    <div className="qr__title">
                        {title}
                    </div>
                    {menuID ?
                        <Link to={`/qr/${menuID}`} className="qr__back-button">
                            Back
                        </Link> :
                        null
                    }
                    <div className="qr__custom__content">
                        {fieldsNames.map((name, index) => this._renderItem(name, fieldsValues[index], index))}
                    </div>
                </div>
           </div>
        );
    }

    private _renderMenuItem(el: PageCut, index: number): React.ReactNode {
        if (el.template === 'custom' || el.template === 'push' || el.template === 'html') {
            return (
                <Link to={'/qr/' + el.uuid} className="qr__menu__item" key={index}>
                    <ReactSVG
                        src={`/icons/templates/${el.template}.svg`}
                        svgClassName="qr__template-icon"
                        tabIndex={0}
                    />
                    {el.title}
                </Link>
            );
        }
        return (
            <a href={StaticQrGens[el.template](el.fieldsValues)} className="qr__menu__item" key={index}>
                <ReactSVG
                    src={`/icons/templates/${el.template}.svg`}
                    svgClassName="qr__template-icon"
                    tabIndex={0}
                />
                {el.title}
            </a>
        );
    }

    private _renderMenu(): React.ReactNode {
        const {page} = this.state;
        if ('innerPages' in page) {
            if (page.innerPages.length === 1 && page.innerPages[0].template === 'custom') {
                return this._renderCustom(page.innerPages[0]);
            }
            return (
                <div className="qr__menu">
                    <div className="qr__title">
                        {page.title}
                    </div>
                    <div className="qr__menu__content">
                        {page.innerPages.map(this._renderMenuItem)}   
                    </div>
                </div>
            );
        }
        return this._renderCustom(page as PageCut);
    }

    private _renderPushPage(): React.ReactNode {
        const {menuID, isSuccessfullPush} = this.state;
        if (isSuccessfullPush === null) {
            this._sendPush();
            return null;// TODO might be loader
        }
        const text = isSuccessfullPush ?
            'Push was successfully sent' :
            'Error: Push was not sent, user didn`t get your message'; 
        return (
            <div className="qr">
                <div className={'qr__push-' + (isSuccessfullPush ? 'succsessfull' : 'error')}>
                    {menuID ?
                        <Link to={`/qr/${menuID}`} className="qr__back-button">
                            Back
                        </Link> :
                        null
                    }
                    {text}
                </div>
            </div>
        );
    }

    render(): React.ReactNode {
        if (!this.state.page && !this.state.isNotAvilable) {
            return null;
        }
        if (this.state.isNotAvilable) {
            return this._render404();
        }
        const {template} = this.state.page;
        if (template === 'push') {
            return this._renderPushPage();
        }
        if (template === 'html' && 'fieldsValues' in this.state.page) {
            return this._renderHTML(this.state.page.fieldsValues[0]);
        }
        return this._renderMenu();
    }
}
