import './qr.scss';
import * as React from 'react';
import Page from 'types/page';
import {getQr} from './qr-provider';

interface Props {
    id: string
}

interface State {
    page: Page | null;
    isNotAvilable: boolean;
}

export default class Qr extends React.Component<Props> {
    state: State = {
        page: null,
        isNotAvilable: false
    }
    componentDidMount() {
        getQr(this.props.id).then(
            (res) => res.json().then(page => this.setState({page})),
            () => this.setState({isNotAvilable: true}) // todo Error
        );
    }

    private _renderItem(name: string, value: string, index: number) {
        return (
            <div key={index}>
                {`${name}: ${value}`}
            </div>
        );
    }

    render(): React.ReactNode {
        if (!this.state.page) {
            return null;
        }
        if (this.state.isNotAvilable) {
            return (
                <div>
                    This page is Private or deleted
                </div>
            );
        }
        const {title, fieldsNames, fieldsValues} = this.state.page;
        return (
            <div>
                <div>
                    {title}
                </div>
                <div>
                    {fieldsNames.map((name, index) => this._renderItem(name, fieldsValues[index], index))}
                </div>
           </div>
        );
    }
}
