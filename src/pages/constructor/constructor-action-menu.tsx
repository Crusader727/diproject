import './constructor-action-menu.scss';
import * as React from 'react';
import ReactSVG from 'react-svg';
import Input from 'components/input/input';
import DropDown from 'components/dropdown/dropdown';

import {Action} from './constructor';
import CommonItems from './views/items';

interface Props {
    actions: Action[];
    currentAction: number;
    saveChanges: (changes: {}) => void;
}

const ActionMenuTypes = ['custom', 'telephone', 'ylocation', 'url', 'email', 'whatsapp', 'push'];

export default class ConstructorActionMenu extends React.Component<Props> {
    private _handleActionNameChange = (event: any) => {
        const {actions, currentAction} = this.props;
        actions[currentAction].name = event.target.value;
        this.props.saveChanges({actions});
    }

    private _handleActionTypeChange = (type: string) => {
        const {actions, currentAction} = this.props;
        actions[currentAction].type = type;
        actions[currentAction].items = CommonItems[type].items;
        actions[currentAction].isNotEditable = CommonItems[type].isNotEditable;
        this.props.saveChanges({actions});
    }

    private _addAction = () => {
        const {actions} = this.props;
        const action: Action = {
            name: '',
            items: [],
            isNotEditable: false,
            type: 'custom'
        }
        const currentAction = actions.push(action) - 1;
        this.props.saveChanges({actions, currentAction});
    }

    private _deleteAction = (index: number) => {
        const actions = this.props.actions.filter((item, i) => i !== index);
        let currentAction = index - 1;
        currentAction = currentAction < 0 ? 0 : currentAction;
        this.props.saveChanges({currentAction, actions});
    }

    private _renderAddItem = (): React.ReactNode => {
        return (
            <div className="constructor__action-menu__content__add-item" onClick={this._addAction}>
                <ReactSVG
                    src={`/icons/round-cross.svg`}
                    svgClassName="constructor__action-menu__content__icon"
                />
            </div>
        );
    }

    private _renderEditItem = (action: Action, index: number): React.ReactNode => {
        return (
            <div className="constructor__action-menu__content__edit-item" key={index}>
                <Input
                    size="small"
                    placeholder="Title"
                    isFocused
                    value={action.name}
                    onChange={this._handleActionNameChange}
                />
                <DropDown onClick={this._handleActionTypeChange} items={ActionMenuTypes}>
                    Type: {action.type}
                </DropDown>
                <ReactSVG
                    src={`/icons/delete.svg`}
                    svgClassName="constructor__action-menu__content__icon"
                    onClick={() => this._deleteAction(index)}
                />
            </div>
        );
    }

    private _renderItem = (action: Action, index: number): React.ReactNode => {
        if (index === this.props.currentAction) {
            return this._renderEditItem(action, index);
        }
        return (
            <div
                className="constructor__action-menu__content__item"
                key={index}
                onMouseUp={() => this.props.saveChanges({currentAction: index})}
            >
                <div className="constructor__action-menu__content__item__name">
                    {action.name}
                </div>
                Type: {action.type}
                <ReactSVG
                    src={`/icons/delete.svg`}
                    svgClassName="constructor__action-menu__content__icon"
                    onMouseDown={() => this._deleteAction(index)}
                />
            </div>
        );
    }

    render(): React.ReactNode {
        const {actions} = this.props;
        return (
            <div className="constructor__action-menu">
                <div className="constructor__action-menu__title">
                    Action Menu
                </div>
                <div className="constructor__action-menu__content">
                    {actions.map(this._renderItem)}
                    {this._renderAddItem()}
                </div>
            </div>
        );
    }
}