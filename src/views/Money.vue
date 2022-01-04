<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types :xxx="123" />
    <Notes />
    <Tags :dataSource="tags" />
  </Layout>
</template>

<script lang="js">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
export default {
  components: { NumberPad, Types, Notes, Tags },
  name: "Money",
  data() {
    return  { 
      tags: ["衣", "食", "住", "行"]
    } 
  }
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>