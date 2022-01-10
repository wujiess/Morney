<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="recordTypes" :value.sync="type" />
    <Tabs
      classPrefix="interval"
      :dataSource="intervals"
      :value.sync="interval"
    />
    <div>
      type:{{ type }}
      <br />
      interval: {{ interval }}
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Money/Tabs.vue";
import Component from "vue-class-component";
import intervals from "@/constants/intervals";
import recordTypes from "@/constants/recordTypes";

@Component({ components: { Tabs } })
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervals = intervals;
  recordTypes = recordTypes;
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

::v-deep .interval-tabs-item {
  height: 48px;
}
</style>