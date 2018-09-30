import './text-area.scss';
import * as React from "react";

interface Props {
    placeholder?: string;
    isFocused?: boolean;
    value?: string;
    onChange?: (e: any) => void
}

export default class TextArea extends React.Component<Props> {
    inputElement: any;

    componentDidMount(){
        if (this.props.isFocused) {
            this.inputElement.focus();
        }
    }

    public render() {
        return (
            <textarea
                ref={input => this.inputElement = input}
                className={'text-area'}
                placeholder={this.props.placeholder}
                maxLength={2000}
                onChange={this.props.onChange}
                value={this.props.value}
            />
        );
    }
}
