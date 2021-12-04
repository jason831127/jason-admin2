<!-- 列表按鈕 - 多選 -->
<template>
  <div>
    <el-button class="button-multiple"
               type="primary"
               slot="append"
               v-on:click="changeStatus"
               :icon="(childMultStatus) ?'el-icon-finished': 'el-icon-edit-outline'"
               plain>批次處理</el-button>
    <el-badge v-if="childMultList.length > 0"
              :value="childMultList.length"
              style="display:initial"
              class="item">
      <el-button type="primary"
                 style="float:left;margin-left:10px;"
                 @click="checkFin = true">選擇完成</el-button>
    </el-badge>
    <el-dialog title="修改內容"
               :width="'85%'"
               :visible.sync="checkFin">
      <slot></slot>
      <br />
      <el-button type="primary"
                 @click="runMultList">執行</el-button>
    </el-dialog>
    <el-dialog title="執行結果"
               :width="'85%'"
               :show-close="runCount == childMultList.length"
               :visible.sync="runStatus"
               :before-close="handleClose">
      <el-switch v-model="search"
                 active-color="#ff4949"
                 inactive-color="#13ce66"
                 active-text="只顯示錯誤內容"
                 inactive-text="全部顯示">
      </el-switch>
      <ExportButton :removeArray="[]"
                    :fileName="'領獎狀態Log'" />
      <el-progress :percentage="Math.floor(runCount / (childMultList.length == 0 ? 1 : childMultList.length))*100"></el-progress>
      <el-table v-if="runStatus"
                :data="gridData.filter(data => !search || data.state)"
                :row-class-name="tableRowClassName">
        <el-table-column property="target"
                         :label="labelName || '目標'"
                         width="150" />
        <el-table-column property="result"
                         label="結果"
                         show-overflow-tooltip />
        <el-table-column property="memo"
                         label="備註">
          <template slot-scope="scope">
            <div v-html="scope.row.memo"></div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: {
    labelName: String,
    /** 選擇目標(跟著父件變動值) */
    multipleStatus: {
      default: false,
      type: Boolean
    },
    multipleList: Array,
    RunFuncion: Function
  },
  data() {
    return {
      childMultStatus: this.multipleStatus,
      childMultList: this.multipleList || [],
      checkFin: false,
      runStatus: false,
      runCount: 0,
      gridData: [],
      search: false
    }
  },
  methods: {
    changeStatus() {
      this.childMultStatus = !this.childMultStatus;
      if (!this.childMultStatus) this.$emit('clear', []);
    },
    async runMultList() {
      this.runCount = 0;
      this.gridData = [];
      this.search = false;
      this.runStatus = true;
      for (let i = 0; i < this.childMultList.length; i++) {
        let result = await this.RunFuncion(this.childMultList[i]);
        this.gridData.push(result);
        this.runCount++;
      }
    },
    handleClose(done) {
      if (this.runCount == this.childMultList.length) {
        this.$confirm('確定關閉?')
          .then(_ => {
            this.runCount = 0;
            this.gridData = [];
            this.checkFin = false;
            this.childMultStatus = false;
            this.$emit('clear', []);
            done();
          })
          .catch(_ => { });
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state) return row.state + '-row';
      return;
    }
  },
  watch: {
    childMultStatus() {
      this.$emit('callback', this.childMultStatus);
    },
    multipleList() {
      this.childMultList = this.multipleList;
    }
  }
};
</script>

<style scoped>
/deep/ .button-multiple {
  float: left;
}
/deep/ .el-table .error-row {
  background: rgb(255, 46, 57);
}

/deep/ .el-table .attention-row {
  background: rgb(255, 178, 78);
}

/deep/ .el-table tbody tr:hover>td { 
    background-color: transparent !important;
}
</style>