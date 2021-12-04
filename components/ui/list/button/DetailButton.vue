<!-- 列表按鈕 - 詳細 -->
<template>
  <router-link :to="`/detail/${path}/${scope[idName]}`">
    <el-button size="mini"
               type="text">詳細</el-button>
  </router-link>
</template>

<script>
export default {
  props: {
    /** 跳轉路徑(必填)  */
    path: {
      type: String,
      required: true
    },
    /** 跳轉目標ID名稱(必填)  */
    idName: {
      type: String,
      required: true
    },
    /** 列表資料  */
    scope: Object
  }
};
</script>