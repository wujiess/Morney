type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    creationDate?: Date;
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
interface Window {
    tags: Tag[],
    findTag: (id: string) => Tag | undefined,
    createTag: (name: string) => void,
    removeTag: (id: string) => boolean,
    updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated',

    records: RecordItem[],
    createRecord: (record: RecordItem) => void
}