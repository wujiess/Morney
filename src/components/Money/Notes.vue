<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入备注" v-model="value"
    /></label>
  </div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
}
</script>

<style lang="scss" scoped>
.notes {
  background-color: #f5f5f5;
  display: block;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>