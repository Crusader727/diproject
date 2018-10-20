import './constructor.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';
import Header from 'components/header/header';
import Input from 'components/input/input';
import TextArea from 'components/text-area/text-area';
import Button from 'components/button/button';
import Notification from 'components/notification/notification';
import Checkbox from 'components/checkbox/checkbox';

import PageCut from 'types/PageCut';
import {createPage, editPage, getPage} from './constructor-provider';

import CommonItems from './views/items';

interface Props {
    username: string;
    type?: string;
    id?: string;
}

export interface Item {
    name?: string;
    value?: string;
    isEditing?: boolean;
    type?: 'date' | 'small';
}

interface State {
    isNotEditable: boolean;
    documentName: string;
    items: Item[];
    notification: 'error' | 'success' | null;
    notificationText: string;
    isCreated: boolean;
    id: string;
    date: string | null;
    isPrivate: boolean,
    isStatic: boolean,
    type?: string
}

export default class Constructor extends React.Component<Props, State> {
    notificationTimeout: any = null;
    constructor(props: any) {
        super(props);

        let items: Item[] = [];
        let isNotEditable = false;
        const {type, id} = this.props;
        if (type && CommonItems[type]) {
            items = CommonItems[type].items;
            isNotEditable = CommonItems[type].isNotEditable;
        }
        this.state = {
            documentName: '',
            date: null,
            items,
            isNotEditable,
            notification: null,
            notificationText: '',
            isCreated: false,
            id,
            isPrivate: false,
            isStatic: isNotEditable && type !== 'html',
            type
        }
    }

    componentDidMount() {
        if (!this.state.id) {
            return;
        }
        getPage(this.state.id).then(
            (res: PageCut) => {
                const items = res.fieldsNames.map((el, i) => ({name: el, value: res.fieldsValues[i]}));
                const d = new Date(res.date);
                const date = d.toDateString() + ' ' + d.toLocaleTimeString();
                this.setState({
                    items,
                    documentName: res.title,
                    date,
                    type: res.template,
                    isCreated: true
                })
            }, 
            () => console.log('error') 
        );
    }

    componentWillUnmount() {
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }
    }

    private _savePage() {
        const page = {
            title: this.state.documentName,
            public: !this.state.isPrivate,
            static: this.state.isStatic,
            fieldsNames: this.state.items.map((el) => el.name),
            fieldsValues: this.state.items.map((el) => el.value),
            template: this.state.type
        }
        if (!this.state.isCreated) {
            createPage(page).then(
                res => this.setState({
                    notification: 'success',
                    notificationText: 'Data was successfully saved',
                    isCreated: true,
                    id: res.uuid
                }),
                () => this.setState({notification: 'error', notificationText: 'Error: changes were not saved'})
            );
        } else {
            editPage(page, this.state.id).then(
                () => this.setState({notification: 'success', notificationText: 'Page was successfully edited'}),
                () => this.setState({notification: 'error', notificationText: 'Error: changes were not saved'})
            )
        }
        this.notificationTimeout = setTimeout(() => this.setState({notification: null}), 3000);
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
                    
                    {!this.state.isNotEditable ?
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
                {!this.state.isNotEditable ? <ReactSVG
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

    private _renderAddItem(): React.ReactNode {
        if (this.state.isNotEditable) {
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

    private _renderCheckboxes = (): React.ReactNode => {
        const {isStatic, isPrivate, isNotEditable, type} = this.state;
        return (
            <div className="constructor__menu__checkboxes">
                <Checkbox
                    text="Private"
                    disabled={isStatic}
                    onClick={() => this.setState({isPrivate: !isPrivate})}
                />
                <Checkbox
                    text="Static"
                    disabled={isPrivate || isNotEditable}
                    checked={isNotEditable && type !== 'html'}
                    onClick={() => this.setState({isStatic: !isStatic})}
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
                <div className="constructor__menu__date">
                    {this.state.date}
                </div>
                {this._renderCheckboxes()}
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
        const {notification, notificationText} = this.state;
        return (
            <>
                <Header username={this.props.username}/>
                <div className="constructor">
                    <div className="constructor__content">
                        {this.state.items.map((item, i) => this._renderItem(item, i))}
                        {this._renderAddItem()}
                    </div>
                    {this._renderMenu()}
                </div>
                {notification && <Notification text={notificationText} type={notification}/>}
            </>
        );
    }
}
