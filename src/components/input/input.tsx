import './input.scss';
import * as React from "react";

interface Props {
    size?: 'small' | 'medium' | 'large' | 'larger';
    type?: 'text' | 'datetime-local';
    placeholder?: string;
    isAnimated?: boolean;
    isFocused?: boolean;
    value?: string;
    onChange?: (e: any) => void;
}

export default class Input extends React.Component<Props> {
    inputElement: any;

    default = {
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
        let size = this.props.size ? this.props.size : this.default.size;
        size = type === 'datetime-local' ? 'medium' : size;
        return (
            <input
                ref={input => this.inputElement = input}
                className={'input size-' + size}
                style={{animationName: isAnimated ? 'enlarge-' + size : undefined}}
                type={type ? type : this.default.type}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}
