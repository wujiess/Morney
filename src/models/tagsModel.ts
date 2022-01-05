const localStorageKeyName = "tags";

type TagsModel = {
    data: string[];
    fetch: () => string[];
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
        const exists = this.data.indexOf(name) > 0;
        if (exists) {
            return "duplicated";
        }
        else {
            this.data.push(name);
            this.save();
            return "success";
        }
    }
}

export default tagsModel;