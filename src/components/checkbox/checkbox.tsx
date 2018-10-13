import './checkbox.scss';
import * as React from 'react';

interface Props {
    onClick?: () => void;
    disabled?: boolean;
    checked?: boolean;
    text: string
}

interface State {
    checked: boolean;
}

export default class Checkbox extends React.Component<Props> {
    state: State = {
        checked: this.props.checked
    }
    private _onClick = () => {
        if (!this.props.disabled) {
            this.setState({checked: !this.state.checked});
            this.props.onClick();
        }
    }
    render(): React.ReactNode {
        const {text, disabled} = this.props;
        const {checked} = this.state;
        return (
            <div className="checkbox" onClick={this._onClick}>
                {text}
                <input
                    type="checkbox"
                    className="checkbox__input"
                />
                <span className={"checkbox__checkmark" + (checked ? ' _checked' : '') + (disabled ? ' _disabled' : '')}/>
            </div>
        );
    }
}