<template>
  <Layout>
    <Types classPrefix="zzz" :value.sync="yyy" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import Component from "vue-class-component";

@Component({ components: { Types } })
export default class Statistics extends Vue {
  yyy = "-";
}
</script>

<style lang="scss" scoped>
::v-deep .zzz-item {
  background-color: #fff;
  &.selected {
    background-color: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>