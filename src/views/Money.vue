<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notes">
      <FormItem
        @update:value="onUpdateNotes"
        fieldName="备注"
        placeholder="在这里输入备注"
      />
    </div>
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import recordsModel from "@/models/recordsModel";
import tagsModel from "@/models/tagsModel";

const records = recordsModel.fetch();
const tags = tagsModel.fetch();

@Component({ components: { NumberPad, Types, FormItem, Tags } })
export default class Money extends Vue {
  tags = tags;
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
    const r: RecordItem = recordsModel.clone(this.record);
    r.creationDate = new Date();
    this.records.push(r);
  }

  @Watch("records")
  onRecordsChanged() {
    recordsModel.save(this.records);
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
.notes {
  padding: 12px 0;
}
</style>