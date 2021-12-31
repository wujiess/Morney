<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script>
export default {
  name: "Types",
  data() {
    return {
      type: "-", // '-'表示支出， '+'表示收入
    };
  },
  methods: {
    selectType(type) {
      // type只能是'-'和'+'中的一个
      if (type !== "-" && type !== "+") {
        throw new Error("type is unknown");
      }
      this.type = type;
    },
  },
};
</script>

<style lang="scss" scoped>
.types {
  background-color: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4px;
      background-color: #333;
    }
  }
}
</style>