<template>
  <div>
    <h3 style="margin-bottom: 10px;">{{ $store.state.menuTitle }}_{{ title }}</h3>
    <template>
      <el-card class="box-card autoCardList">
        <div slot="header"
             class="clearfix">
          <SearchWord v-model="showList"
                      :data="dataList"
                      :message="message"
                      :searchItemName="searchItemName" />
        </div>
        <div class="boxCardBtn">
          <!-- 功能按鈕請放這(ex: 排序、新增) -->
          <ExportButton :removeArray="['el-table__fixed-right']"
                        :fileName="title" />
        </div>
        <div class="boxCardTable">
          <div>共 {{ showList.length }} 筆</div>
          <el-table stripe
                    :data="showList"
                    :default-sort="defaultSort"
                    :max-height="maxHeight"
                    style="width: 100%">
            <el-table-column label="操作"
                             :fixed="(tableRFixed) ? 'right': false">
              <template slot-scope="scope">
                <!-- 列表功能按鈕請放這(ex: 詳細、刪除) -->
                <DetailButton :scope="scope.row"
                              :idName="targetJudgle"
                              :path="path" />
                <DeleteButton v-if="(scope.row.uid != 'guest-default-setting')"
                              :scope="scope.row"
                              :idName="targetJudgle"
                              :method="deleteTarget"
                              v-on:callBack="deleteCall" />
              </template>
            </el-table-column>
            <TableColumn v-model="showList"
                         :config="columnConfig"
                         :format="formatTurn" />
          </el-table>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  props: ['tableRFixed'],
  async asyncData ({ store }) {
    return {
      /** 此頁目錄(影響菜單、標體顯示) */
      title: store.state.activeMenu,
      /** 此頁路徑名(影響跳轉頁面位置 ex: 新增、排序、詳細) */
      path: 'account',
      /** 列表資料(演出備份用，勿刪) */
      dataList: [],
      /** 顯示列表資料(演出用，勿刪) */
      showList: [],
      /** 可被搜尋欄位名 */
      searchItemName: ['uid', 'nickname', 'email'],
      /** 列表欄位設定(
       * prop: 欄位名
       * label: 顯示名稱
       * sortable: 欄位開放自動排序
       * filter: 篩選設定 {Array} ex: [{text: '顯示名稱', value: '篩選值'}]) 
       * 
       * ex: 
       * { prop: 'action', label: '狀態', sortable: false, filter: [{"text":"草稿","value":"draft"},{"text":"已發佈","value":"publish"}] },
       * { prop: 'eDate', label: '時間狀態', sortable: true }
       * */
      columnConfig: [
        { prop: 'uid', label: 'uid', sortable: true },
        { prop: 'nickname', label: '名稱', sortable: true },
        { prop: 'email', label: 'email', sortable: true },
        { prop: 'createDate', label: '建立日期', sortable: true }
      ],
      /** 判斷目標設定欄位(影響列表處理功能 ex: 刪除、詳細) */
      targetJudgle: 'uid',
      /** 預設自動排序設定(prop: 欄位名, order: 'ascending/descending') */
      defaultSort: { prop: 'createDate', order: 'ascending' },
      /** 關鍵字查詢 預設值(勿動) */
      message: '',
      maxHeight: 0
    }
  },
  methods: {
    /** 查詢資料 */
    async searchData () {
      /** 畫面Loading與菜單表演(勿動) */
      const loading = this.$loading({
        lock: true,
        text: '請稍後片刻......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      await this.$store.dispatch('sendGraphQL', {
        title: this.title,
        query: `query{ admin{uid,createDate,nickname,email} }`
      }).then(rs => {
        this.dataList = rs.data.data.admin || [];
        this.showList = this.dataList;
      });
      loading.close();
    },
    /** 列表內容格式轉換 */
    formatTurn (row, column) {
      let value = row[column.property];
      switch (column.property) {
        default:
          return value;
      }
    },
    /** 自動計算列表(Table)高度 */
    tableMaxHeight () {
      let boxCard = $('.box-card');
      let boxHead = $('.box-card .el-card__header');
      let boxBodyPadding = 40;
      let btn = $('.boxCardBtn');
      let tableWord = 22;
      this.maxHeight = (boxCard[0] ? boxCard[0].offsetHeight : 0) - (boxHead[0] ? boxHead[0].offsetHeight : 0)
        - (btn[0] ? btn[0].offsetHeight : 0) - tableWord - boxBodyPadding;
    },
    /** 列表刪除內容設定 */
    //  刪除動作
    async deleteTarget (id) {
      let rs = await this.$store.dispatch('sendGraphQL', {
        title: this.title,
        query: `mutation{deleteAdmin(uid:"${ id }"){uid,createDate,nickname,email}}`
      }).catch((err) => {
        this.$message.error('傳送錯誤! ' + err);
      });
      return rs.data.data.deleteAdmin || [];
    },
    //  刪除後動作
    deleteCall (list) {
      this.dataList = list;
      this.showList = this.dataList;
    }
  },
  async mounted () {
    this.$nextTick(function () {
      this.searchData();
      window.addEventListener('resize', this.tableMaxHeight);
      this.tableMaxHeight();
    })
  }
}
</script>