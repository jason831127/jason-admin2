<template>
  <el-container style="height: -webkit-fill-available;">
    <NavMenu :params="this.params"
             :menu="this.menu" />
    <el-container  class="is-vertical">
      <Header :user="this.authUser" />
      <el-main>
        <nuxt-child :tableRFixed="tableRFixed" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '~/components/Header.vue';
import NavMenu from '~/components/NavMenu.vue';

export default {
  head() {
    return {
      title: `${this.$store.state.activeMenu} 排序`
    }
  },
  middleware: ['auth', 'getGlobalParams'],
  asyncData(context) {
    return {
      params: context.store.state.globalParams,
      menu: context.store.state.menu,
      authUser: context.store.state.authUser,
      query: context.query,
      menuTitle: null,
      tableRFixed: context.store.state.tableRFixed
    }
  },
  components: {
    Header, NavMenu
  },
  watch: {
    '$store.state.tableRFixed': function () {
      this.tableRFixed = this.$store.state.tableRFixed;
    }
  },
  mounted() {
    if (this.query.message) this.$message({ message: this.query.message, center: true, type: 'success' });
  }
}
</script>

<style scope>
.el-main {
  border-top: 1px solid #ddd;
}
.el-menu-item-group__title {
  padding: 0;
}
</style>