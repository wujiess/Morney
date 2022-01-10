<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :dataSource="recordTypes" :value.sync="record.type" />
    <div class="notes">
      <FormItem
        @update:value="onUpdateNotes"
        fieldName="备注"
        placeholder="在这里输入备注"
      />
    </div>
    <Tags />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tabs from "@/components/Money/Tabs.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypes from "@/constants/recordTypes";

@Component({ components: { NumberPad, Tabs, FormItem, Tags } })
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

  get records() {
    return this.$store.state.records;
  }

  recordTypes = recordTypes;

  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>