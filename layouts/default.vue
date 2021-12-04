<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function () {
      function mobileViewUpdate() {
        var viewportWidth = $(window).width();
        if (viewportWidth <= 768) {
          $("form.autoForm").addClass("el-form--label-top");
        } else {
          $("form.autoForm").removeClass("el-form--label-top");
        }
      }
      mobileViewUpdate();
      $(window).on('load, resize', mobileViewUpdate);
    });
  }
}
</script>

<style>
html, body {
  font-family: 'Noto Sans TC', sans-serif !important;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.el-main {
  border-top: 1px solid #ddd;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-card.box-card.autoCardList{
  height: calc(100vh - 1em - 135px);
}
.boxCardBtn {
  display: flow-root;
}
.boxCardTable .pageControl {
  display: inline-flex;
  line-height: 32px;
}

.el-table .running-row {
  color: #4caf50;
  font-weight: bold;
}

/* 表格Style-End */
form.autoForm.el-form--label-top .el-form-item__content {
  margin-left: 0 !important;
}

.span-show-detail{
  color: #7083ba;
  background-color: #f5f7fa;
  height: auto;
  line-height: 38px;
}
</style>
