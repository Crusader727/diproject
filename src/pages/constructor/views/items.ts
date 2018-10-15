import {Item} from '../constructor';

const wifiItems: Item[] = [
    {name: 'name', value: '', isEditing: true, type: 'small'},
    {name: 'password', value: '', isEditing: true, type: 'small'}
];
const telephoneItems: Item[] = [
    {name: 'Phone Number', value: '', isEditing: true, type: 'small'},
];
const smsItems: Item[] = [
    {name: 'Phone Number', value: '', isEditing: true, type: 'small'},
    {name: 'Message', value: '', isEditing: true, type: 'small'},
];
const ylocationItems: Item[] = [
    {name: 'Coordinates or Organization Name', value: '', isEditing: true, type: 'small'}
];
const eventItems: Item[] = [
    {name: 'Summary', value: '', isEditing: true},
    {name: 'Location Description', value: '', isEditing: true, type: 'small'},
    {name: 'Start Date', value: '', isEditing: true, type: 'date'},
    {name: 'End Date', value: '', isEditing: true, type: 'date'}
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