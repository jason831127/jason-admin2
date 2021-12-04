<!-- 表單按鈕 - 取消並跳回列表頁面 -->
<template>
  <el-button 
    class="button-export"
    type="warning"
    slot="append"
    icon="el-icon-download" 
    @click="exportExcel">匯出</el-button>
</template>

<script>
import moment from 'moment'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  props: {
    removeArray: Array,
    fileName: String,
    tableName: {
      type: String,
      default: '.el-table'
    }
  },
  methods: {
    exportExcel () {
      let table = document.querySelector(this.tableName).cloneNode(true);
      for(let i = 0; i < this.removeArray.length; i++) {
        let childClassName = this.removeArray[i];
        if (document.getElementsByClassName(childClassName).length > 0) table.removeChild(table.querySelector("." + childClassName));
      }
      let wb = XLSX.utils.table_to_book(table,{raw:true});
      var wbout = XLSX.write(wb , { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        let name = ((this.fileName)? this.fileName: '') + moment().format('YYYY-MM-DD');
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name+'.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    }
  }
};
</script>

<style>
.button-export{
  margin-right: 5px;
  float: right;
}
</style>