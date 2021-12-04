<!-- 列表查詢條件建立 -->
<template>
  <div>
    <el-input class="input-with-select"
              v-model="searchTarget"
              placeholder="請输入查詢條件内容"
              @keyup.enter.native="search">
      <el-select v-model="searchItem"
                 slot="prepend"
                 placeholder="查詢條件項目"
                 style="width: 130px;">
        <el-option v-for="option in options"
                   :label="option.label"
                   :value="option.value"
                   :key="option.value">
        </el-option>
      </el-select>
      <el-button slot="append"
                 icon="el-icon-search"
                 v-on:click="search()"></el-button>
    </el-input>
    <div class="tagHome"
         style="margin-top:10px;">
      <label style="font-family: '微软雅黑';font-size:12px;color: #909399;">條件: </label>
      <label v-if="tags.length == 0"
             style="font-family: '微软雅黑';font-size:12px;color: #909399;">無</label>
      <el-tag v-for="tag in tags"
              :key="tag.label"
              closable
              @close="handleClose(tag)">
        {{tag.label}} {{ tag.context }}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** 列表資料  */
    data: Array,
    /** 選項設定列表  */
    options: Array,
    /** 查詢程式  */
    searchData: Function
  },
  data () {
    return {
      childListData: this.data,
      searchTarget: null,
      searchItem: this.options[0].value,
      tags: []
    }
  },
  methods: {
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    search () {
      if (this.searchTarget) {
        //  篩選
        let targetArray = this.searchTarget.split(/\s*(?:[,;\s]|$)\s*/);
        targetArray = targetArray.filter(item => item != '');
        //  取得tags內容與名稱
        let name = this.options.filter(item => item.value == this.searchItem)[0];
        targetArray.forEach(context => {
          let tagsGet = this.tags.filter(tag => tag.name == this.searchItem && tag.context == context);
          if (tagsGet.length == 0) {
            let data = { name: this.searchItem, label: name.label, context: context };
            this.tags.push(data);
          }
        });
      }
      this.searchTarget = null;
      if (this.tags.length > 0) this.searchData(this.tags);
      else this.$message('請輸入查詢條件');
    }
  },
  model: {
    event: 'change'
  },
  watch: {
    data () {
      this.childListData = this.data;
      this.$emit('change', this.childListData);
    }
  }
};
</script>

<style>
.tagHome {
  max-height: 100px;
  overflow: auto;
  border-style: dashed;
  border-color: #9baab7;
}
</style>