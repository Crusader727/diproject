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
const htmlItems: Item[] = [
    {name: 'HTML code', value: '', isEditing: true}
];
const urlItems: Item[] = [
    {name: 'URL', value: '', isEditing: true, type: 'small'}
];
const emailItems: Item[] = [
    {name: 'Email', value: '', isEditing: true, type: 'small'},
    {name: 'Subject', value: '', isEditing: true, type: 'small'},
    {name: 'Message', value: '', isEditing: true}
];
const contactItems: Item[] = [
    {name: 'Firstname', value: '', isEditing: true, type: 'small'},
    {name: 'Lastname', value: '', isEditing: false, type: 'small'},
    {name: 'Nick', value: '', isEditing: false, type: 'small'},
    {name: 'Phone', value: '', isEditing: false, type: 'small'},
    {name: 'Second Phone', value: '', isEditing: false, type: 'small'},
    {name: 'Email', value: '', isEditing: false, type: 'small'},
    {name: 'Website', value: '', isEditing: false, type: 'small'},
    {name: 'Birthday', value: '', isEditing: false, type: 'date'},
    {name: 'Street', value: '', isEditing: false, type: 'small'},
    {name: 'Zipcode', value: '', isEditing: false, type: 'small'},
    {name: 'City', value: '', isEditing: false, type: 'small'},
    {name: 'State', value: '', isEditing: false, type: 'small'},
    {name: 'Country', value: '', isEditing: false, type: 'small'},
    {name: 'Notes', value: '', isEditing: false},
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
    'html': {
        isNotEditable: true,
        items: htmlItems
    },
    'url': {
        isNotEditable: true,
        items: urlItems
    },
    'email': {
        isNotEditable: true,
        items: emailItems
    },
    'contact': {
        isNotEditable: true,
        items: contactItems
    },
    'custom': { // :(
        isNotEditable: false,
        items: []
    },
    'whatsapp': { // :(
        isNotEditable: true,
        items: telephoneItems
    }
}

export default Items;