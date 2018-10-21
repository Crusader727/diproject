import './constructor-content.scss';
import * as React from 'react';
import ReactSVG from 'react-svg';
import Input from 'components/input/input';
import TextArea from 'components/text-area/text-area';
import {Item} from './constructor';

interface Props {
    items: Item[];
    isNotEditable?: boolean;
    saveChanges: (changes: {}) => void;
}

export default class ConstructorContent extends React.Component<Props> {
    private _deleteItem(index: number) {
        const oldItems = this.props.items;
        const items = oldItems.filter((item, i) => i !== index);
        this.props.saveChanges({items});
    }

    private _handleItemNameChange = (index: number, type?: 'name' | 'value') => {
        return (event: any) => {
            const items = this.props.items;
            if (type === 'name' && !this.props.isNotEditable) {
                items[index].name = event.target.value
            } else if (type === 'value') {
                items[index].value = event.target.value
            }
            this.props.saveChanges({items});
        }
    }

    private _openEditor(index?: number) {
        const items = this.props.items;
        items.forEach(item => item.isEditing = false);
        if (index !== undefined) {
            items[index].isEditing = true;
        }
        this.props.saveChanges({items});
    }

    private _addItem() {
        this._openEditor();
        const item: Item = {name: '', value: '', isEditing: true};
        const items = this.props.items;
        items.push(item);
        this.props.saveChanges({items});
    }

    private _renderAddItem(): React.ReactNode {
        if (this.props.isNotEditable) {
            return null;
        }
        return (
            <div className="constructor__content__add-item" onClick={() => this._addItem()}>
                <ReactSVG
                    src={`/icons/round-cross.svg`}
                    svgClassName="round-cross"
                />
            </div>
        );
    }

    private _renderItem = (item: Item, index: number): React.ReactNode => {
        if (item.isEditing) {
            return this._renderEditItem(item.name, item.value, item.type, index);
        }
        return (
            <div
                key={index}
                className="constructor__content__item"
                style={{flexDirection: item.value.length > 30 ? 'column' : 'row'}}
                onClick={() => this._openEditor(index)}
            >
                <div className="constructor__content__item__title">
                    {`${item.name}:`}
                </div>
                <div>
                    {item.value}
                </div>
            </div>
        );
    }

    private _renderEditItem(name?: string, value?: string, type?: string, index?: number): React.ReactNode {
        let secondfield = <TextArea
            placeholder="Description"
            value={value}
            onChange={this._handleItemNameChange(index, 'value')}
        />;
        if (type) {
            secondfield = <Input
                size="large"
                placeholder="Description"
                isFocused
                value={value}
                type={type === 'date' ? 'datetime-local' : undefined}
                onChange={this._handleItemNameChange(index, 'value')}                
            />;
        }
        return (
            <div
                className="constructor__content__edit-item"
                key={index}
            >
                <div className="constructor__content__edit-item__content">
                    
                    {!this.props.isNotEditable ?
                        <Input
                            size="medium"
                            placeholder="Title"
                            isFocused
                            value={name}
                            onChange={this._handleItemNameChange(index, 'name')}
                        /> :
                        <div className="constructor__content__edit-item__content__title">
                            {name}
                        </div>
                    }
                    <div className="constructor__content__edit-item__text-wrapper">
                        {secondfield}
                    </div>
                </div>
                {!this.props.isNotEditable ? <ReactSVG
                    src={`/icons/delete.svg`}
                    svgClassName="close"
                    onClick={() => this._deleteItem(index)}
                /> : null}
                <ReactSVG
                    src={`/icons/close.svg`}
                    svgClassName="close"
                    onClick={() => this._openEditor()}
                />
            </div>
        );
    }

    render(): React.ReactNode {
        const {items} = this.props;
        return (
            <div className="constructor__content">
                {items.map((item, i) => this._renderItem(item, i))}
                {this._renderAddItem()}
            </div>
        );
    }
}