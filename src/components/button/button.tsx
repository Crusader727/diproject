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
    downloadHref?: string;
    downloadTitle?: string;
}

export default class Button extends React.Component<Props> {
    anchor: null | HTMLAnchorElement = null;
    private _onClick = () => {
        if (this.anchor) {
            this.anchor.click();
            return;
        }
        this.props.onClick();
    }
    public render() {
        const {type, downloadHref, downloadTitle, text, onClick, icon, onBlur} = this.props;
        return (
            <button 
                // className={'input_size-' + (size ? size : this.defaultProps.size)}
                className={'button' + (type ? ' _' + type : '')}
                onClick={this._onClick}
                onBlur={onBlur}
            >
                {text}
                {icon && <ReactSVG
                        src={`https://velox-app.herokuapp.com/icons/${icon}.svg`}
                        svgClassName=""
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