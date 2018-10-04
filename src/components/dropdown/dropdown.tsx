import './dropdown.scss';
import * as React from "react";

interface Item {
    name: string;
    onClick: () => void;
};

interface Props {
    items: Item[];
    chosenIndex?: number;
}

interface State {
    isContentShown: boolean
}

export default class DropDown extends React.Component<Props> {
    state: State = {
        isContentShown: false
    }

    private _renderContent() {
        if (!this.state.isContentShown) {
            return null;
        }
        const {items, chosenIndex} = this.props;
        return (
            <div className="dropdown__content">
                {
                    items.map((item, index) => (
                        <div 
                            key={item.name}
                            className={"dropdown__content__item" + (chosenIndex === index ? ' chosen': '')}
                            onClick={item.onClick}
                        >
                            {item.name}
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
