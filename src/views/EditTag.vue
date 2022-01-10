<template>
  <layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click="goBack" />
      <span>编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        @update:value="update"
        fieldName="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { FormItem, Button },
  computed: {
    currentTag() {
      return this.$store.state.currentTag;
    },
  },
})
export default class EditTag extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    console.log(id);
    this.$store.commit("setCurrentTag", id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      //store.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      return;
      // const result = store.removeTag(this.tag.id);
      // if (result) {
      //   this.$router.back();
      // } else {
      //   alert("删除失败");
      // }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .leftIcon {
    width: 20px;
    height: 20px;
  }
  > .rightIcon {
    width: 20px;
    height: 20px;
  }
}
.form-wrapper {
  background-color: #fff;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>