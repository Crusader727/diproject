import './dropdown.scss';
import * as React from "react";

interface Item {
    name: string;
    onClick: () => void;
};

interface Props {
    items: Item[];
}

export default class DropDown extends React.Component<Props> {
    public render() {
        const {items} = this.props;
        return (
            <div className="dropdown">
                {this.props.children}
                <div className="dropdown__content">
                    {
                        items.map((item) => (
                            <div key={item.name} className="dropdown__content__item" onClick={item.onClick}>
                                {item.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}
