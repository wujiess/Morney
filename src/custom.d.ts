type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    creationDate?: string;
};

type Tag = {
    id: string,
    name: string
}

type TagsModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    remove: (id: string) => boolean;
    save: () => void;
}

type RootState = {
    records: RecordItem[],
    tags: Tag[],
    currentTag?: Tag
}