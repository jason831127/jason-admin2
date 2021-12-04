<!-- 列表按鈕 - 新增 -->
<template>
  <el-button
    class="button-add"
    type="success"
    slot="append"
    icon="el-icon-plus"
    v-on:click="addListItem"
    >新增</el-button
  >
</template>

<script>
export default {
  props: {
    /** 跳轉路徑(必填)  */
    path: {
      type: String,
      required: true
    }
  },
  methods: {
    addListItem() {
      this.$router.push({ path: "/add/" + this.path });
    }
  }
};
</script>

<style>
.button-add {
  float: right;
}
</style>