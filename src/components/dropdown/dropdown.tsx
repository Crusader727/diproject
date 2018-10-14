import './dropdown.scss';
import * as React from "react";

interface Props {
    items: string[];
    onClick: (value: string) => void;
}

interface State {
    isContentShown: boolean,
    chosenIndex: number
}

export default class DropDown extends React.Component<Props> {
    state: State = {
        isContentShown: false,
        chosenIndex: 0
    }

    private _renderContent() {
        if (!this.state.isContentShown) {
            return null;
        }
        const {items} = this.props;
        const {chosenIndex} = this.state;
        return (
            <div className="dropdown__content">
                {
                    items.map((item, index) => (
                        <div 
                            key={item}
                            className={"dropdown__content__item" + (chosenIndex === index ? ' chosen': '')}
                            onClick={() => {
                                this.props.onClick(item);
                                this.setState({chosenIndex: index});
                            }}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
        );
    }

    public render() {
        return (
            <div className="dropdown"
                onClick={() => this.setState({isContentShown: true})}
                onBlur={() => this.setState({isContentShown: false})}
                tabIndex={0}
            >
                {this.props.children}
                {this._renderContent()}
            </div>
        );
    }
}
