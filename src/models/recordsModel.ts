import clone from "@/lib/clone";

const localStorageKeyName = "records";

const recordsModel = {
    data:[] as RecordItem[],
    create(record: RecordItem){
        const r: RecordItem = clone(record);
        r.creationDate = new Date();
        this.data.push(r);
    },
    fetch() {
        this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];
        return this.data;
    },
    save() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
}

export default recordsModel;