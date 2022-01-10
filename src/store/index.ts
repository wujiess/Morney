import clone from '@/lib/clone';
import createId from '@/lib/createId';
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)
const localStorageRecordsKeyName = "records";
const localStorageTagsKeyName = "tags";

type RootState = {
  records: RecordItem[],
  tags: Tag[],
  currentTag?: Tag
}

const store = new Vuex.Store({
  state: {
    records: [] as RecordItem[],
    tags: [] as Tag[],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.records = JSON.parse(localStorage.getItem(localStorageRecordsKeyName) || "[]") as RecordItem[];
    },
    createRecord(state, record) {
      const r: RecordItem = clone(record);
      r.creationDate = new Date();
      state.records?.push(r);
      store.commit('saveRecords');
      //recordStore.saveRecords();
    },
    saveRecords(state) {
      localStorage.setItem(localStorageRecordsKeyName, JSON.stringify(state.records));
    },
    fetchTags(state) {
      state.tags = JSON.parse(localStorage.getItem(localStorageTagsKeyName) || "[]") as Tag[];
    },
    createTag(state, name: string) {
      const names = state.tags.map(item => item.name);
      const exists = names.indexOf(name) > 0;
      if (exists) {
        alert("标签名重复了");
      }
      else {
        const id = createId().toString();
        state.tags.push({ id, name: name });
        store.commit('saveTags')
      }
    },
    saveTags(state) {
      localStorage.setItem(localStorageTagsKeyName, JSON.stringify(state.tags));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tags.filter((t) => t.id === id)[0];
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tags.length; i++) {
        if (state.tags[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tags.splice(index, 1);
        store.commit("saveTags");
      }
    },
    updateTag(state, payload: { id: string, name: string }) {
      const { id, name } = payload;
      const ids = state.tags.map(p => p.id);
      if (ids.indexOf(id) >= 0) {
        const names = state.tags.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          alert('标签名重复');
        }
        else {
          const tag = state.tags.filter(p => p.id === id)[0];
          tag.name = name;
          tag.id = name;
          store.commit("saveTags");
          return 'success';
        }
      }
    },
  },
})

export default store;