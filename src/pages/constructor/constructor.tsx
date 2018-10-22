import './constructor.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/header/header';
import Input from 'components/input/input';
import Button from 'components/button/button';
import Notification from 'components/notification/notification';
import Checkbox from 'components/checkbox/checkbox';

import ConstructorContent from './constructor-content';
import ConstructorActionMenu from './constructor-action-menu';

import PageCut from 'types/PageCut';
import {createPage, editPage, getPage, createContainer, editContainer} from './constructor-provider';

import CommonItems from './views/items';
import PageFull from 'types/pagefull';

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

export interface Action {
    name: string;
    items: Item[];
    isNotEditable?: boolean;
    type?: string
}

interface State {
    actions: Action[];
    currentAction: number;
    documentName: string;
    notification: 'error' | 'success' | null;
    notificationText: string;
    isCreated: boolean;
    id: string;
    date: string | null;
    isPrivate: boolean,
    isStatic: boolean,
    isCustom: boolean
}

export default class Constructor extends React.Component<Props, State> {
    notificationTimeout: any = null;
    constructor(props: any) {
        super(props);

        let action: Action = {name: 'test', items: []};
        const {type, id} = this.props;
        if (type && CommonItems[type]) {
            action.items = CommonItems[type].items;
            action.isNotEditable = CommonItems[type].isNotEditable;
            action.type = type;
        }
        this.state = {
            currentAction: 0,
            actions: type === 'custom' ? [] : [action],
            documentName: '',
            date: null,
            notification: null,
            notificationText: '',
            isCreated: false,
            id,
            isPrivate: false,
            isStatic: action.isNotEditable && type !== 'html',
            isCustom: type === 'custom'
        }
    }

    componentDidMount() {
        if (!this.state.id) { //TODO
            return;
        }
        getPage(this.state.id).then(
            (res: PageCut) => {
                const items = res.fieldsNames.map((el, i) => ({name: el, value: res.fieldsValues[i]}));
                const d = new Date(res.date);
                const date = d.toDateString() + ' ' + d.toLocaleTimeString();
                this.setState({
                    actions: [{name: '', type: res.template, items}],
                    documentName: res.title,
                    date,
                    isCustom: res.template === 'custom',
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
        if (!this.state.isCustom) { // TODO refactor
            const page = {
                title: this.state.documentName,
                public: !this.state.isPrivate,
                static: this.state.isStatic,
                fieldsNames: this.state.actions[0].items.map((el) => el.name),
                fieldsValues: this.state.actions[0].items.map((el) => el.value),
                template: this.state.actions[0].type
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
        } else {
            const {actions, isPrivate, documentName} = this.state;
            const innerPages: PageCut[] = actions.map(el => {
                return {
                    title: el.name,
                    template: el.type,
                    fieldsNames: el.items.map(item => item.name),
                    fieldsValues: el.items.map(item => item.value),
                    public: true,
                    static: false
                };
            });
            const page: PageFull = {
                title: documentName,
                public: !isPrivate,  
                template: 'custom',
                innerPages
            }
            if (!this.state.isCreated) {
                createContainer(page).then(
                    res => this.setState({
                        notification: 'success',
                        notificationText: 'Data was successfully saved',
                        isCreated: true,
                        id: res.uuid
                    }),
                    () => this.setState({notification: 'error', notificationText: 'Error: changes were not saved'})
                );
            } else {
                editContainer(page, this.state.id).then(
                    () => this.setState({notification: 'success', notificationText: 'Page was successfully edited'}),
                    () => this.setState({notification: 'error', notificationText: 'Error: changes were not saved'})
                )
            }
            this.notificationTimeout = setTimeout(() => this.setState({notification: null}), 3000);
        }
        
    }

    private _renderCheckboxes = (): React.ReactNode => {
        const {isStatic, isPrivate, currentAction, actions, isCustom} = this.state;
        const isNotEditable = !isCustom && actions[currentAction].isNotEditable;
        const type = !isCustom && actions[currentAction].type;
        return (
            <div className="constructor__menu__checkboxes">
                <Checkbox
                    text="Private"
                    disabled={isStatic}
                    onClick={() => this.setState({isPrivate: !isPrivate})}
                />
                {!isCustom && <Checkbox
                    text="Static"
                    disabled={isPrivate || isNotEditable}
                    checked={isNotEditable && type !== 'html'}
                    onClick={() => this.setState({isStatic: !isStatic})}
                />}
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
                {this.state.isCustom ?
                    <ConstructorActionMenu
                        actions={this.state.actions}
                        currentAction={this.state.currentAction}
                        saveChanges={(changes) => this.setState(changes)}
                    /> :
                    null
                }
            </div>
        );
    }

    public render(): React.ReactNode {
        const {notification, notificationText, currentAction, actions} = this.state;
        const isNotEditable = actions.length && actions[currentAction].isNotEditable;
        return (
            <>
                <Header username={this.props.username}/>
                <div className="constructor">
                    {actions.length ?
                        <ConstructorContent
                            isNotEditable={isNotEditable}
                            items={actions[currentAction].items}
                            saveChanges={(changes) => {
                                actions[currentAction].items = changes;
                                this.setState({actions});
                            }}
                        /> :
                        <div className="constructor__empty-content">

                        </div>
                    }
                    {this._renderMenu()}
                </div>
                {notification && <Notification text={notificationText} type={notification}/>}
            </>
        );
    }
}
