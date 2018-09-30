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

export default class DropDown extends React.Component<Props> {
    public render() {
        const {items, chosenIndex} = this.props;
        return (
            <div className="dropdown">
                {this.props.children}
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
            </div>
        );
    }
}
