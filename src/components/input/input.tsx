import './input.scss';
import * as React from "react";

interface Props {
    size?: 'small' | 'medium' | 'large' | 'larger';
    type?: 'text';
    placeholder?: string;
    isAnimated?: boolean;
    isFocused?: boolean;
}

export default class Input extends React.Component<Props> {
    inputElement: any;

    defaultProps = {
        size: 'medium',
        type: 'text' 
    }

    componentDidMount(){
        if (this.props.isFocused) {
            this.inputElement.focus();
        }
    }

    public render() {
        const {type, isAnimated} = this.props;
        const size = this.props.size ? this.props.size : this.defaultProps.size;
        return (
            <input
                ref={input => this.inputElement = input}
                className={'input size-' + size}
                style={{animationName: isAnimated ? 'enlarge-' + size : undefined}}
                type={type ? type : this.defaultProps.type}
                placeholder={this.props.placeholder}
            />
        );
    }
}
