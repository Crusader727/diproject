import {Item} from '../constructor';

const wifiItems: Item[] = [
    {name: 'name', value: '', isEditing: true},
    {name: 'password', value: '', isEditing: true}
];

const Items: Record<string, {items: Item[], isNotEditable: boolean}> = {
    'wifi': {
        isNotEditable: true,
        items: wifiItems
    }
}

export default Items;