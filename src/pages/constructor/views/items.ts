import {Item} from '../constructor';

const wifiItems: Item[] = [
    {name: 'name', value: '', isEditing: true},
    {name: 'password', value: '', isEditing: true}
];
const telephoneItems: Item[] = [
    {name: 'Phone Number', value: '', isEditing: true},
];
const smsItems: Item[] = [
    {name: 'Phone Number', value: '', isEditing: true},
    {name: 'Message', value: '', isEditing: true},
];
const ylocationItems: Item[] = [
    {name: 'Coordinates or Organization Name', value: '', isEditing: true},
];
const eventItems: Item[] = [
    {name: 'Summary', value: '', isEditing: true},
    {name: 'Location Description', value: '', isEditing: true},
    {name: 'Start Date', value: '', isEditing: true},
    {name: 'End Date', value: '', isEditing: true}
];

const Items: Record<string, {items: Item[], isNotEditable: boolean}> = {
    'wifi': {
        isNotEditable: true,
        items: wifiItems
    },
    'telephone': {
        isNotEditable: true,
        items: telephoneItems
    },
    'sms': {
        isNotEditable: true,
        items: smsItems
    },
    'event': {
        isNotEditable: true,
        items: eventItems
    },
    'ylocation': {
        isNotEditable: true,
        items: ylocationItems
    },
}

export default Items;