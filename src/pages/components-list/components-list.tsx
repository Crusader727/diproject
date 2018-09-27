import './components-list.scss';
import * as React from 'react';

import Input from 'components/input/input';
import Button from 'components/botton/button';

export default class ComponentsList extends React.Component {
    public render() {
        return (
            <div className="components-list">
                <Input/>
                <Button text="xuy" type="air"/>
            </div>
        );
    }
}