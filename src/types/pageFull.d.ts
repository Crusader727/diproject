import PageCut from './pageCut';

interface PageFull {
    uuid?: string,
    title: string,
    mine?: boolean,
    public: boolean,
    date?: string,
    template?: string;
    innerPages?: PageCut[];
}

export default PageFull;