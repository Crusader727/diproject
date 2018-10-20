import './qr.scss';
import * as React from 'react';
import PageCut from 'types/pagecut';
import {getQr} from './qr-provider';

interface Props {
    id: string
}

interface State {
    page: PageCut | null;
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

    render(): React.ReactNode {
        if (!this.state.page && !this.state.isNotAvilable) {
            return null;
        }
        if (this.state.isNotAvilable) {
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
        const {title, fieldsNames, fieldsValues, template} = this.state.page;
        if (template === 'html') {
            return (
                <div className="qr__html">
                    <iframe
                        srcDoc={fieldsValues[0]}
                        sandbox=""
                        width="100%"
                        height="100%"
                        frameBorder="false"
                    />
                </div>
            );
        }
        return (
            <div className="qr">
                <div className="qr__title">
                    {title}
                </div>
                <div className="qr__content">
                    {fieldsNames.map((name, index) => this._renderItem(name, fieldsValues[index], index))}
                </div>
                <div>
                    <a href="mailto:awdawd?subject=awdawd&body=awdawd">click me</a>
                </div>
           </div>
        );
    }
}
