<!-- 列表欄位名與自動列表 -->
<template>
  <div>
    <div v-for="(item, index) in columnConfig"
         :key="index">
      <el-table-column :prop="item.prop"
                       :order="index-1"
                       :label="item.label"
                       :min-width="item.width || '130'"
                       :sortable="item.sortable"
                       :filters="item.filter"
                       :filter-method="(item.filter)?((item.filterMethod)?item.filterMethod: filterTarget) : null"
                       :formatter="format"
                       :show-overflow-tooltip="item.overFlow">
        <template v-if="item.image"
                  #default="{row}">
          <el-image style="width: 100px; height: 100px"
                    :src="row[item.image]"
                    :preview-src-list="[ row[item.image] ]">
            <div slot="error"
                 class="el-image__error">
              <div v-if="row[item.image] == ''">未設定</div>
              <div v-else>加载失败</div>
            </div>
          </el-image>
        </template>
        <template v-else-if="item.showContext"
                  #default="{row}">
          <el-tooltip placement="bottom"
                      effect="light">
            <div v-html="row[item.showContext]"
                 class="newsPop"
                 slot="content"></div>
            <el-button type="text">內容檢視</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**  列表欄位顯示格式設定 */
    config: Array,
    /**  列表內容格式轉換程式 */
    format: Function
  },
  data() {
    return {
      columnConfig: this.config,
    }
  },
  model: {
    event: 'change'
  },
  methods: {
    filterTarget(value, row, column) {
      return row[column.property] == value
    }
  },
  watch: {
    config(val) {
      this.columnConfig = val
    }
  }
};
</script>

<style>

.newsPop img {
  max-width: 100%;
}
</style>