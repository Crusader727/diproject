interface Page {
    title: string,
    isPublic: boolean,
    fieldsNames: string[],
    fieldsValues: string[],
    date?: string
}

export default Page;