<!-- 列表按鈕 - 排序 -->
<template>
  <el-button
    class="button-sort"
    type="primary"
    slot="append"
    icon="el-icon-sort"
    v-on:click="sortList"
    >{{ textValue }}</el-button
  >
</template>

<script>

export default {
  props: {
    /** 跳轉路徑(必填)  */
    path: {
      type: String,
      required: true
    },
    textValue: {
      type: String,
      default: '變更排序'
    }
  },
  methods: {
    sortList() {
      this.$router.push({ path: "/sort/" + this.path });
    }
  }
};
</script>