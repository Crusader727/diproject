import {Item} from '../constructor';

const wifiItems: Item[] = [
    {name: 'name', value: '', isEditing: true},
    {name: 'password', value: '', isEditing: true}
];

const Items: Record<string, {items: Item[], isNotEditable: boolean, isStatic: boolean}> = {
    'wifi': {
        isNotEditable: true,
        isStatic: true,
        items: wifiItems
    }
}

export default Items;