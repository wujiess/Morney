<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/tags/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span> <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagsModel from "@/models/tagsModel";
import Button from "@/components/Button.vue";

@Component({ components: { Button } })
export default class Tags extends Vue {
  tags = window.tags;
  
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const result = tagsModel.create(name);
      if (result === "duplicated") {
        alert("标签名重复了");
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tags {
  background-color: #fff;
  font-size: 16px;
  padding-left: 16px;
  .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 20px;
      height: 20px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>