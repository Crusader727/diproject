import './qr.scss';
import * as React from 'react';
import PageCut from 'types/pagecut';
import PageFull from 'types/PageFull';
import {getQr} from './qr-provider';
import {Link} from 'react-router-dom';
import StaticQrGens from 'pages/main/components/static-qr-gens';

interface Props {
    id: string
}

interface State {
    page: PageFull | PageCut | null;
    isNotAvilable: boolean;
}

export default class Qr extends React.Component<Props> {
    state: State = {
        page: null,
        isNotAvilable: false
    }
    componentDidMount() {
        getQr(this.props.id).then(
            (page) => this.setState({page}),
            () => this.setState({isNotAvilable: true}) // todo Error
        );
    }

    private _renderItem(name: string, value: string, index: number) {
        return (
            <div key={index} className="qr__content__item">
                <div className="qr__content__item__title">
                    {name ? name + ':' : ''}
                </div>
                <div className="qr__content__item__content">
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
        return (
            <div className="qr">
                <div className="qr__title">
                    {title}
                </div>
                <div className="qr__content">
                    {fieldsNames.map((name, index) => this._renderItem(name, fieldsValues[index], index))}
                </div>
           </div>
        );
    }

    private _renderMenuItem(el: PageCut): React.ReactNode {
        if (el.template === 'custom') {
            return (
                <Link to={'/qr/' + el.uuid} className="qr__menu__item">
                    {el.title}
                </Link>
            );
        }
        return (
            <a href={StaticQrGens[el.template](el.fieldsValues)} className="qr__menu__item">{el.title}</a>
        );
    }

    private _renderMenu(): React.ReactNode {
        const {page} = this.state;
        if ('innerPages' in page) {
            return (
                <div className="qr__menu">
                    <div className="qr__title">
                        {page.title}
                    </div>
                    {page.innerPages.map(this._renderMenuItem)}   
               </div>
            );
        }
        return this._renderCustom(page as PageCut);
    }

    render(): React.ReactNode {
        if (!this.state.page && !this.state.isNotAvilable) {
            return null;
        }
        if (this.state.isNotAvilable) {
            return this._render404();
        }
        const {template} = this.state.page;
        if (template === 'html' && 'fieldsValues' in this.state.page) {
            return this._renderHTML(this.state.page.fieldsValues[0]);
        }
        return this._renderMenu();
    }
}
