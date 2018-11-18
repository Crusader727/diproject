import './button.scss';
import * as React from "react";
import ReactSVG from 'react-svg';

interface Props {
    size?: 'small' | 'medium' | 'large';
    type?: 'action' | 'air';
    text?: string;
    icon?: string;
    onClick?: () => void;
    onBlur?: () => void;
    downloadHref?: string;
    downloadTitle?: string;
    isDisabled?: boolean;
}

export default class Button extends React.Component<Props> {
    anchor: null | HTMLAnchorElement = null;
    private _onClick = () => {
        if (!this.props.isDisabled) {
            if (this.anchor) {
                this.anchor.click();
                return;
            }
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
    }

    public render() {
        const {type, downloadHref, downloadTitle, text, onClick, icon, onBlur, size, isDisabled} = this.props;
        const className = 'button' +
            (type ? ' _' + type : '') +
            (size ? ' _size-' + size : '') +
            (isDisabled ? ' _disabled' : '');
        return (
            <button 
                className={className}
                onClick={this._onClick}
                onBlur={onBlur}
            >
                {text}
                {icon && <ReactSVG
                        src={`/icons/${icon}.svg`}
                        svgClassName={"button__icon" + (size ? '__' + size : '')}
                    />
                }
                {downloadHref ? 
                    <a
                        href={downloadHref}
                        download={downloadTitle}
                        ref={(anchor) => this.anchor = anchor}
                    /> :
                    null
                }
            </button>
        );
    }
}