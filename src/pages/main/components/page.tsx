import './page.scss';
import * as React from 'react';
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

    private _renderMenu(): React.ReactNode {
        if (!this.state.isMenuShown) {
            return null;
        }
        return (
            <div className="page__menu">
                <Button type="air" icon="edit" />
                <Button type="air" icon="delete" onClick={this._deletePage}/>
                <Button type="air" icon="print"/>
                <Button type="air" icon="download"/>
            </div>
        );
    }

    render(): React.ReactNode {
        if (!this.state.isShown) {
            return null;
        }
        const {id, title, date} = this.props;
        const formatedDate = new Date(date).toDateString();
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
                        onClick={() => this.setState({isMenuShown: true})}
                    />
                </div>
            </div>
        );
    }
}