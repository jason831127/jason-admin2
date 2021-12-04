<!-- 列表關鍵字查詢功能 -->
<template>
  <el-input class="input-with-select"
            placeholder="請輸入關鍵字(可用 逗號、空格分隔)"
            v-model="childMessage"
            @keyup.enter.native="search()">
    <slot slot="prepend"></slot>
    <el-button slot="append"
               icon="el-icon-search"
               v-on:click="search()"></el-button>
  </el-input>
</template>

<script>
export default {
  props: {
    /** 列表資料  */
    data: Array,
    /** 關鍵字查詢  */
    message: String,
    /** 可被查詢欄位設定  */
    searchItemName: Array
  },
  data() {
    return {
      childListData: this.data,
      childMessage: this.message,
      childCheck: this.searchItemName
    }
  },
  methods: {
    search() {
      this.$emit('catchData', null);
      this.serachWord();
    },
    serachWord() {
      let searchArray = this.childMessage.split(/\s*(?:[,;\s]|$)\s*/);
      searchArray = searchArray.filter(key => key && key != '');
      let showList = (searchArray.length > 0) ? this.childListData.filter(data => this.childCheck.some((key) => {
        return searchArray.filter(word => {
          return data[key] && data[key].toString().search(word) != -1}).length > 0;
      })) : this.childListData;
      this.$emit('change', showList);
    }
  },
  model: {
    event: 'change'
  },
  watch: {
    data() {
      this.childListData = this.data;
      this.serachWord();
    }
  }
};
</script>