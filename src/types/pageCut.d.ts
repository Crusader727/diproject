interface PageCut {
    uuid: string,
    title: string,
    isPublic: boolean,
    fieldsNames: string[],
    fieldsValues: string[],
    date?: string
}

export default PageCut;