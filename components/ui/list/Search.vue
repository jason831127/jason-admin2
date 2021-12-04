<!-- 列表關鍵字查詢功能 -->
<template>
  <el-input class="input-with-select"
            :placeholder="`搜尋( 可查詢目標: ${targetName.map(n => (n)?n.label : '').join('、')}  )`"
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
    /** 關鍵字查詢  */
    click: Function,
    /** 關鍵字查詢目標  */
    searchItemName: Array,
    columnConfig: Array
  },
  data () {
    let targetName = [];
    if (this.searchItemName && this.columnConfig) {
      targetName = this.searchItemName.map(name => this.columnConfig.find(c => c.prop == name))
    }
    return {
      childMessage: '',
      targetName: targetName
    }
  },
  methods: {
    search () {
      if (this.click) this.click(this.childMessage);
    }
  }
};
</script>