const localStorageKeyName = "tags";

type Tag = {
    id: string,
    name: string
}

type TagsModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    save: () => void;
}
const tagsModel: TagsModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },
    save() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name) {
        const names = this.data.map(item => item.name);
        const exists = names.indexOf(name) > 0;
        if (exists) {
            return "duplicated";
        }
        else {
            this.data.push({ id: name, name: name });
            this.save();
            return "success";
        }
    }
}

export default tagsModel;