<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="recordTypes" :value.sync="type" />
    <Tabs
      classPrefix="interval"
      :dataSource="intervals"
      :value.sync="interval"
    />
    <ol>
      <li v-for="group in result" :key="group.title">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Money/Tabs.vue";
import Component from "vue-class-component";
import intervals from "@/constants/intervals";
import recordTypes from "@/constants/recordTypes";
import dayjs from "dayjs";

@Component({ components: { Tabs } })
export default class Statistics extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.join(",");
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年MM月DD日");
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get records() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).records;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get result() {
    const { records } = this;
    // eslint-disable-next-line no-undef
    type HashTableValue = { title: string; items: RecordItem[] };

    const hashtable: {
      [key: string]: HashTableValue;
    } = {};

    for (let i = 0; i < records.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const date = records[i].creationDate?.split("T")[0] as string;
      hashtable[date] = hashtable[date] || { title: date, items: [] };
      hashtable[date].items.push(records[i]);
    }
    return hashtable;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    this.$store.commit("fetchRecords");
  }

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

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background-color: #fff;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>