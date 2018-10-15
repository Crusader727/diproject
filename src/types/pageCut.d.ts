interface PageCut {
    uuid?: string,
    title: string,
    mine?: boolean,
    public: boolean,
    static: boolean,
    fieldsNames: string[],
    fieldsValues: string[],
    date?: string,
    template?: string;
}

export default PageCut;