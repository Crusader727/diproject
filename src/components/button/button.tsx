import './button.scss';
import * as React from "react";
import ReactSVG from 'react-svg';

interface Props {
    size?: 'small' | 'medium';
    type?: 'action' | 'air';
    text?: string;
    icon?: string;
    onClick?: () => void;
    onBlur?: () => void;
}

export default class Button extends React.Component<Props> {
    public render() {
        const {type, size, text, onClick, icon, onBlur} = this.props;
        return (
            <button 
                // className={'input_size-' + (size ? size : this.defaultProps.size)}
                className={'button' + (type ? ' _' + type : '')}
                onClick={onClick}
                onBlur={onBlur}
            >
                {text}
                {icon && <ReactSVG
                        src={`icons/${icon}.svg`}
                        svgClassName=""
                    />
                }
            </button>
        );
    }
}