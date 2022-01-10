<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="types" :value.sync="type" />
    <Tabs classPrefix="interval" :dataSource="intervals" :value.sync="interval" />
    <div>
      type:{{ type }}
      <br />
      interval: {{ interval }}
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Money/Tabs.vue";
import Component from "vue-class-component";

@Component({ components: { Types, Tabs } })
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervals = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
  types = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background-color: #fff;
  &.selected {
    background-color: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>