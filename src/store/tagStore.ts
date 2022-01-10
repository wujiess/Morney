import createId from '@/lib/createId';

const localStorageKeyName = "tags";

const tagStore = {
    tags: [] as Tag[],
    fetchTags() {
        this.tags = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]") as Tag[];
        return this.tags;
    },
    findTag(id: string) {
        return this.tags.filter((t) => t.id === id)[0];
    },
    createTag(name: string) {
        const names = this.tags.map(item => item.name);
        const exists = names.indexOf(name) > 0;
        if (exists) {
            alert("标签名重复了");
            return "duplicated";
        }
        else {
            const id = createId().toString();
            this.tags.push({ id, name: name });
            this.saveTags();
            alert("添加成功");
            return "success";
        }
    },
    removeTag(id: string) {
        let index = -1;
        for (let i = 0; i < this.tags.length; i++) {
            if (this.tags[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.saveTags();
            return true;
        }
        else {
            return false;
        }
    },
    updateTag(id: string, name: string) {
        const ids = this.tags.map(p => p.id);
        if (ids.indexOf(id) >= 0) {
            const names = this.tags.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            }
            else {
                const tag = this.tags.filter(p => p.id === id)[0];
                tag.name = name;
                tag.id = name;
                this.saveTags();
                return 'success';
            }
        }
        else {
            return 'not found';
        }
    },
    saveTags() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.tags));
    }
}

tagStore.fetchTags();

export default tagStore;