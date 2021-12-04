<!-- 列表按鈕 - 刪除 -->
<template>
  <el-button size="mini" type="text" @click="deleteTarget(scope[idName])">刪除</el-button>
</template>

<script>
  export default {
    props: {
      scope: Object,
      idName: [String, Number],
      method: Function
    },
    methods: {
			deleteTarget(target) {
        this.$confirm(
          `此操作將永久删除是否繼續?`, 
          '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          confirmButtonLoading: false,
          type: 'warning',
          dangerouslyUseHTMLString: true,
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '執行中...';
              await this.$emit('callBack', await this.method(target));
              done();
            } else {
              done();
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    }
  };
</script>