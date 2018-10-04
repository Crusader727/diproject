import './notification.scss';
import * as React from "react";

interface Props {
    text: string;
    type: 'error' | 'success';
}

export default class Notification extends React.Component<Props> {
    public render() {
        const {text, type} = this.props;
        return (
            <div className={"notification _" + type}>
                {text}
            </div>
        );
    }
}
