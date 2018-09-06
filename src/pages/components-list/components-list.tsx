import './components-list.scss';
import * as React from 'react';

import Input from 'components/input/input';

export default class ComponentsList extends React.Component {
    public render() {
        return (
            <div className="components-list">
                <Input size="large"/>
                <Input size="medium"/>
                <Input size="small"/>
            </div>
        );
    }
}