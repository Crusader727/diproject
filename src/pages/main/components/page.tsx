import './page.scss';
import * as React from 'react';
import * as QRCode from 'qrcode.react';
import ReactSVG from 'react-svg';
import Button from 'components/button/button';

interface Props {
    title: string,
    id: string
}

interface State {
    isMenuShown: boolean;
}

export default class Page extends React.Component<Props> {
    state: State = {
        isMenuShown: false
    }

    private _renderMenu(): React.ReactNode {
        if (!this.state.isMenuShown) {
            return null;
        }
        return (
            <div className="page__menu">
                <Button type="air" icon="edit"/>
                <Button type="air" icon="delete"/>
                <Button type="air" icon="print"/>
                <Button type="air" icon="download"/>
            </div>
        );
    }

    render(): React.ReactNode {
        const {id, title} = this.props;
        return (
            <div className="page">
                <a className="page__content" href={`qr/${id}`} target="_blank">
                    <QRCode value={`https://velox-app.herokuapp.com/qr/${id}`} size={130}/>
                </a>
                {this._renderMenu()}
                <div className="page__title">
                    <div>
                        {title}
                    </div>
                    <ReactSVG
                        src="icons/more.svg"
                        svgClassName="page__icon"
                        onClick={() => this.setState({isMenuShown: true})}
                        onBlur={() => this.setState({isMenuShown: false})}
                        tabIndex={0}
                    />
                </div>
            </div>
        );
    }
}