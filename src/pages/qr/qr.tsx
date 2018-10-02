import './qr.scss';
import * as React from 'react';
import Page from 'types/page';

interface Props {
    id: string
}

interface State {
    page: Page;
}

export default class Qr extends React.Component<Props> {
    state: State = {
        page: {
            title: 'test',
            isPublic: true,
            fieldsNames: ['first', 'second', 'third'],
            fieldsValues: ['firstV', 'secondV', 'thirdV']
        }
    }

    private _renderItem(name: string, value: string, index: number) {
        return (
            <div key={index}>
                {`${name}: ${value}`}
            </div>
        );
    }

    render(): React.ReactNode {
        const {title, fieldsNames, fieldsValues} = this.state.page;
        console.log(this.props.id);
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
