<template>
  <el-container>
    <NavMenu :params="this.params"
             :menu="this.menu"></NavMenu>
    <el-container>
      <Header :user="this.authUser" />
      <el-main>
        <nuxt-child :foobar="123" />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Header from '~/components/Header.vue';
import NavMenu from '~/components/NavMenu.vue';

export default {
  middleware: ['auth', 'getGlobalParams'],
  asyncData(context) {
    return {
      id: context.params.id,
      params: context.store.state.globalParams,
      menu: context.store.state.menu,
      authUser: context.store.state.authUser,
      query: context.query
    }
  },
  components: {
    Header, NavMenu
  }
}
</script>

<style scope>
.el-main{
    border-top: 1px solid #ddd;
}
.el-menu-item-group__title {
  padding: 0;
}
</style>