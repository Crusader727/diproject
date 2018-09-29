function makeClassName(name: string): (str: string) => string {
    return (str: string): string => {
        return name+'__'+str;
    }
}

export default makeClassName;