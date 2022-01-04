<template>
  <Layout class-prefix="layout">
    {{ records }}
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

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  creationDate?: Date;
};

@Component({ components: { NumberPad, Types, Notes, Tags } })
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  records: Record[] = JSON.parse(localStorage.getItem("records") || "[]");
  record: Record = { tags: [], notes: "", type: "-", amount: 0 };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const r: Record = JSON.parse(JSON.stringify(this.record));
    r.creationDate = new Date();
    this.records.push(r);
  }

  @Watch("records")
  onRecordsChanged() {
    localStorage.setItem("records", JSON.stringify(this.records));
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