<template>
  <el-container style="height: -webkit-fill-available;">
    <NavMenu :params="this.params"
             :menu="this.menu" />
    <el-container class="is-vertical">
      <Header :user="this.authUser" />
      <el-main>
        <nuxt-child />
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
      title: `${this.$store.state.activeMenu} 詳細資料`
    }
  },
  middleware: ['auth', 'getGlobalParams'],
  asyncData(context) {
    return {
      params: context.store.state.globalParams,
      menu: context.store.state.menu,
      authUser: context.store.state.authUser,
      query: context.query
    }
  },
  components: {
    Header, NavMenu
  },
  mounted() {
    if (this.query.message) this.$message({ message: this.query.message, center: true, type: 'success' });
  }
}
</script>