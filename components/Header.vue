<template>
  <el-header class="header">
    <el-button n-link="/login" class="share-button" icon="el-icon-menu" @click.native="clickHandeler" style="padding: 12px 14px;"></el-button>
    <div class="user-info">
      <img :src="this.user.avatar" height="25px" style=" border-radius: 100%;"><span>{{this.user.nickname}}</span>
      <nuxt-link to="/login"><el-button class="share-button">Logout</el-button></nuxt-link>
    </div>
  </el-header>
</template>


<style scoped>
  .header {
    overflow: hidden;
    width: 100%;
    line-height: 60px;
    padding: 0 10px;
  }
  .header .logo{ display: inline-block; padding-top: 10px; height: 50px}
  header .user-info{ display: flex; align-items:center; float: right; }
  header .user-info span{ padding: 0 5px;}
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      clickHandeler() {
        this.isCollapse = this.isCollapse ? false : true;
      }
    },
    props: ['user'],
    mounted() {
      this.$watch('isCollapse', (v) => {
        this.$bus.$emit('isCollapse', v)
      }, {
        immediate: true
      });
      this.$nextTick(function () {
        if ($(window).width() <= 768) this.isCollapse = true;
      });
    }
  };
</script>