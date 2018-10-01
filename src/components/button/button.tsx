import './button.scss';
import * as React from "react";

interface Props {
    size?: 'small' | 'medium';
    type?: 'action' | 'air';
    text?: string;
    onClick?: () => void;
}

export default class Button extends React.Component<Props> {
    public render() {
        const {type, size, text, onClick} = this.props;
        return (
            <button 
                // className={'input_size-' + (size ? size : this.defaultProps.size)}
                className={'button' + (type ? ' _' + type : '')}
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
}