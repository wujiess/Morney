<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import model from "@/model";

const records = model.fetch();

@Component({ components: { NumberPad, Types, Notes, Tags } })
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  // eslint-disable-next-line no-undef
  records: RecordItem[] = records;
  // eslint-disable-next-line no-undef
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    // eslint-disable-next-line no-undef
    const r: RecordItem = model.clone(this.record);
    r.creationDate = new Date();
    this.records.push(r);
  }

  @Watch("records")
  onRecordsChanged() {
    model.save(this.records);
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>