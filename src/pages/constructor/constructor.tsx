import './constructor.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';
import Header from 'components/header/header';
import Input from 'components/input/input';
import TextArea from 'components/text-area/text-area';
import Button from 'components/button/button';
import Notification from 'components/notification/notification';

import Page from 'types/page';
import {createPage, editPage} from './constructor-provider';

import CommonItems from './views/items';

interface Props {
    type: string
}

export interface Item {
    name?: string;
    value?: string;
    isEditing?: boolean;
}

interface State {
    isNotEditable: boolean;
    documentName: string;
    items: Item[];
    notification: 'error' | 'success' | null;
    isCreated: boolean;
    id: string;
}

export default class Constructor extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        let items: Item[] = [];
        let isNotEditable = false;
        const {type} = this.props;
        if (type && CommonItems[type]) {
            items = CommonItems[type].items,
            isNotEditable = CommonItems[type].isNotEditable
        }
        this.state = {
            documentName: '',
            items,
            isNotEditable,
            notification: null,
            isCreated: false,
            id: ''
        }
    }

    private _savePage() {
        const page: Page = {
            title: this.state.documentName,
            isPublic: true,
            fieldsNames: this.state.items.map((el) => el.name),
            fieldsValues: this.state.items.map((el) => el.value)
        }
        if (!this.state.isCreated) {
            createPage(page).then(
                res => this.setState({
                    notification: 'success',
                    isCreated: true,
                    id: res.uuid
                }),
                () => this.setState({notification: 'error'})
            );
        } else {
            editPage(page, this.state.id).then(
                () => this.setState({notification: 'success'}),
                () => this.setState({notification: 'error'})
            )
        }
        setTimeout(() => this.setState({notification: null}), 3000);
    }

    private _openEditor(index?: number) {
        const items = this.state.items;
        items.forEach(item => item.isEditing = false);
        if (index !== undefined) {
            items[index].isEditing = true;
        }
        this.setState({items});
    }

    private _deleteItem(index: number) {
        const oldItems = this.state.items;
        const items = oldItems.filter((item, i) => i !== index);
        this.setState({items});
    }

    private _addItem() {
        this._openEditor();
        const item: Item = {name: '', value: '', isEditing: true};
        const items = this.state.items;
        items.push(item);
        this.setState({items});
    }

    private _handleItemNameChange = (index: number, type?: 'name' | 'value') => {
        return (event: any) => {
            const items = this.state.items;
            if (type === 'name' && !this.state.isNotEditable) {
                items[index].name = event.target.value
            } else if (type === 'value') {
                items[index].value = event.target.value
            }
            this.setState({items});
        }
    }
    
    private _renderItem = (item: Item, index: number): React.ReactNode => {
        if (item.isEditing) {
            return this._renderEditItem(item.name, item.value, index);
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

    private _renderEditItem(name?: string, value?: string, index?: number): React.ReactNode {
        return (
            <div
                className="constructor__content__edit-item"
                key={index}
            >
                <div className="constructor__content__edit-item__content">
                    <Input
                        size="large"
                        placeholder="Title"
                        isFocused
                        value={name}
                        onChange={this._handleItemNameChange(index, 'name')}
                    />
                    <div className="constructor__content__edit-item__text-wrapper">
                        <TextArea
                            placeholder="Description"
                            value={value}
                            onChange={this._handleItemNameChange(index, 'value')}
                        />
                    </div>
                </div>
                <ReactSVG
                    src={`icons/delete.svg`}
                    svgClassName="close"
                    onClick={() => this._deleteItem(index)}
                />
                <ReactSVG
                    src={`icons/close.svg`}
                    svgClassName="close"
                    onClick={() => this._openEditor()}
                />
            </div>
        );
    }

    private _renderAddItem(): React.ReactNode {
        if (this.state.isNotEditable) {
            return null;
        }
        return (
            <div className="constructor__content__add-item" onClick={() => this._addItem()}>
                <ReactSVG
                    src={`icons/round-cross.svg`}
                    svgClassName="round-cross"
                />
            </div>
        );
    }

    private _renderMenu(): React.ReactNode {
        return (
            <div className="constructor__menu">
                <Input
                    size="medium"
                    placeholder="Document Title"
                    value={this.state.documentName}
                    onChange={(e) => this.setState({documentName: e.target.value})}
                />
                <div className="constructor__menu__actions">
                    <Button text="Save" onClick={() => this._savePage()}/>
                    <Link to="/">
                        <Button text="Cancel"/>
                    </Link>
                </div>
            </div>
        );
    }

    public render(): React.ReactNode {
        const {notification} = this.state;
        return (
            <>
                <Header />
                <div className="constructor">
                    <div className="constructor__content">
                        {this.state.items.map((item, i) => this._renderItem(item, i))}
                        {this._renderAddItem()}
                    </div>
                    {this._renderMenu()}
                </div>
                {notification && <Notification text={notification} type={notification}/>}
            </>
        );
    }
}
