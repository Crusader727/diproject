const StaticQrGens: Record<string, (values: string[]) => string> = {
    'wifi': (values: string[]): string => {
        return `WIFI:T:WPA;S:${values[0]};P:${values[1]};;`;
    },
    'telephone': (values: string[]): string => {
        return `tel:${values[0]}`;
    },
    'sms': (values: string[]): string => {
        return `SMSTO:${values[0]}:${values[1]}`;
    },
    'event': (values: string[]): string => {
        return (
            `BEGIN:VEVENT\nSUMMARY:${values[0]}\nLOCATION:${values[1]}\nDTSTART:${values[2]}\nDTEND:${values[3]}\nEND:VEVENT`
        );
    },
    'ylocation': (values: string[]): string => {
        return (
        encodeURI(`https://yandex.ru/maps/?text=${values[0]}`)
        );
    },
}

export default StaticQrGens;