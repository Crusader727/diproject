const StaticQrGens: Record<string, (values: string[]) => string> = {
    'wifi': (values: string[]): string => {
        return `WIFI:T:WPA;S:${values[0]};P:${values[1]};;`;
    },
    'telephone': (values: string[]): string => {
        return `tel:${values[0]}`;
    },
    'sms': (values: string[]): string => {
        return `sms:${values[0]}&body=${values[1]}`;
    },
    'event': (values: string[]): string => {
        const date1 = values[2].replace(/[\:\-]/g,'') + '00';
        const date2 = values[3].replace(/[\:\-]/g,'') + '00';
        return (
            `BEGIN:VEVENT\nSUMMARY:${values[0]}\nLOCATION:${values[1]}\nDTSTART:${date1}\nDTEND:${date2}\nEND:VEVENT`
        );
    },
    'ylocation': (values: string[]): string => {
        return (
        encodeURI(`https://yandex.ru/maps/?text=${values[0]}`)
        );
    },
    'html': (values: string[]): string => {
        return (
            values[0]
        );
    },
    'url': (values: string[]): string => {
        return (
            values[0]
        );
    },
    'email': (values: string[]): string => {
        return (
            `mailto:${values[0]}?subject=${values[1]}&body=${values[2]}`
        );
    },
    'contact': (values: string[]): string => {
        return (
            `MECARD:N:${values[0]},${values[1]};NICKNAME:${values[2]};TEL:${values[3]};TEL:${values[4]};EMAIL:${values[5]};BDAY:${values[6]};NOTE:${values[7]};ADR:,,${values[8]},${values[9]},${values[10]},${values[11]},${values[12]};;`
        );
    },
}

export default StaticQrGens;