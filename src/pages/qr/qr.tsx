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
            <div key={index}>
                {`${name}: ${value}`}
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
