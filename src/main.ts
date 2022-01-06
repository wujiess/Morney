import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Icon from '@/components/Icon.vue'
import Layout from '@/components/Layout.vue'
import tagsModel from '@/models/tagsModel'
import recordsModel from './models/recordsModel'

Vue.config.productionTip = false

Vue.component('Nav', Nav);
Vue.component('Icon', Icon);
Vue.component('Layout', Layout)

//record store
window.records = recordsModel.fetch();
window.createRecord = (record: RecordItem) => {
  recordsModel.create(record);
}

//tag store
window.tags = tagsModel.fetch();
window.findTag = (id: string) => {
  return window.tags.filter((t) => t.id === id)[0];
}
window.createTag = (name: string) => {
  const result = tagsModel.create(name);
  if (result === "duplicated") {
    alert("标签名重复了");
  }
}
window.removeTag = (id: string) => {
  return tagsModel.remove(id);
}
window.updateTag = (id: string, name: string) => {
  return tagsModel.update(id, name);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
