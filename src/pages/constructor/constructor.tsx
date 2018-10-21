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

import ConstructorContent from './constructor-content';

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
                    <ConstructorContent
                        isNotEditable={this.state.isNotEditable}
                        items={this.state.items}
                        saveChanges={(chages) => this.setState(chages)}
                    />
                    {this._renderMenu()}
                </div>
                {notification && <Notification text={notificationText} type={notification}/>}
            </>
        );
    }
}
