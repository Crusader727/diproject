import './input.scss';
import * as React from "react";

interface Props {
    size?: 'small' | 'medium' | 'large';
    type?: 'text';
}

export default class Input extends React.Component<Props> {
    defaultProps = {
        size: 'medium',
        type: 'text' 
    }
    public render() {
        const {type, size} = this.props;
        return (
            <div>
                <input 
                    // className={'input_size-' + (size ? size : this.defaultProps.size)}
                    className={'input'}
                    type={type ? type : this.defaultProps.type}
                />
            </div>
        );
    }
}