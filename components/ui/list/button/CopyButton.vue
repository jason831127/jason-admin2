<!-- 列表按鈕 - 刪除 -->
<template>
  <el-button size="mini"
             style="margin-left: 0px"
             type="text"
             @click="copyTarget(scope[idName])">複製</el-button>
</template>

<script>
export default {
  props: {
    scope: Object,
    idName: [String, Number],
    method: Function,
    /** 跳轉路徑(必填)  */
    path: {
      type: String,
      required: true
    }
  },
  methods: {
    async copyTarget(target) {
      let newDataList = await this.method(target);

      this.$confirm(
        `是否進入複製的信件詳細資訊?`,
        '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        confirmButtonLoading: false,
        type: 'warning',
        dangerouslyUseHTMLString: true,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '執行中...';
            done();
            this.detailListItem(newDataList[0].id);
          } else {
            this.$message({
              type: 'info',
              message: '取消跳轉'
            });
            done();
          }
        }
      })
    },
    detailListItem(id) {
      this.$router.push({ path: "/detail/" + this.path + '/' + id });
    }
  }
};
</script>