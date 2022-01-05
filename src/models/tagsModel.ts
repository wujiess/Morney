import createId from "@/lib/createId";

const localStorageKeyName = "tags";

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
            const id = createId().toString();
            this.data.push({ id, name: name });
            this.save();
            return "success";
        }
    },
    update(id, name) {
        const ids = this.data.map(p => p.id);
        if (ids.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            }
            else {
                const tag = this.data.filter(p => p.id === id)[0];
                tag.name = name;
                tag.id = name;
                this.save();
                return 'success';
            }
        }
        else {
            return 'not found';
        }
    },
    remove(id) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.data.splice(index, 1);
            this.save();
            return true;
        }
        else {
            return false;
        }
    }
}

export default tagsModel;