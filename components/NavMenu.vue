<template>
  <el-aside style="width: auto; background-color: rgb(102, 102, 102);">
    <el-row class="tac">
      <no-ssr>
        <el-menu :default-active="activeMenu"
                 :router="false"
                 class="el-menu-vertical"
                 unique-opened
                 :collapse="isCollapse"
                 background-color="#666"
                 text-color="#fff"
                 style="min-height: 100vh;"
                 active-text-color="#ffd04b">
          <div style="padding:0 20px;">
            <el-popover placement="bottom"
                        width="200"
                        trigger="click">
              <el-form label-width="125px">
                <el-form-item label="固定列表操作欄位">
                  <el-tooltip :content="((tableRFixed)?'開啟':'關閉') + '固定列表操作欄位'"
                              placement="top">
                    <el-switch v-model="tableRFixed"
                               active-color="#13ce66"
                               inactive-color="#ff4949"
                               :active-value="true"
                               :inactive-value="false"
                               @change="changeSwitch('tableRFixed', tableRFixed)">
                    </el-switch>
                  </el-tooltip>
                </el-form-item>
              </el-form>
              <el-button style="width:-webkit-fill-available;margin: 10px 0;"
                         type="warning"
                         slot="reference">開關設定</el-button>
            </el-popover>
          </div>
          <div v-for="item in menu"
               :key="item.id">
            <el-submenu v-if="item.link == null"
                        :index="item.label">
              <template slot="title">
                <i :class="item.icon"></i>
                <span v-text="item.label"></span>
              </template>
              <el-menu-item-group class="over-hide"
                                  v-for="sub in item.children"
                                  :key="sub.id">
                <router-link v-if="sub.type == 'self'"
                             :to="sub.link">
                  <el-menu-item :index="sub.label"
                                :route="sub.link"
                                v-text="sub.label" />
                </router-link>
                <a v-if="sub.type == 'redash'"
                   :href="sub.link"
                   target="_blank">
                  <el-menu-item :index="sub.label"
                                :route="'/'"
                                v-text="sub.label" />
                </a>
              </el-menu-item-group>
            </el-submenu>
            <router-link v-if="item.link != null"
                         :to="item.link">
              <el-menu-item :index="item.label">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
              </el-menu-item>
            </router-link>
          </div>
        </el-menu>
      </no-ssr>
    </el-row>
  </el-aside>
</template>


<script>
import ElButton from "../node_modules/element-ui/packages/button/src/button.vue";

export default {
  components: { ElButton },
  props: ['params', 'menu'],
  asyncData({ store }) {
    return {
      activeMenu: store.state.activeMenu
    }
  },
  data() {
    let activeMenu = this.$store.state.activeMenu
    return {
      isCollapse: false,
      activeMenu: activeMenu,
      tableRFixed: this.$store.state.tableRFixed
    };
  },
  methods: {
    changeSwitch(type, value) {
      this.$store.dispatch('setActiveSwitch', { type: type, value: value })
    }
  },
  mounted() {
    this.$bus.$on('isCollapse', (data) => {
      this.isCollapse = data;
    });
  }
};
</script>

<style scoped>
.over-hide {
  overflow: hidden;
}
.el-menu {
  border: none;
}

.el-submenu__title i {
  color: white !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  overflow: hidden;
}

.el-menu--collapse {
  width: auto;
}

.el-submenu .el-menu-item {
  height: 60px;
  line-height: 60px;
  background-color: #819EAE !important;
}

.el-menu a,
.el-menu a:focus {
  text-decoration: none;
  color: #fff;
}

@media only screen and (max-width: 768px) {
  .el-menu--collapse {
    width: 0;
    left: 1px;
  }
}
</style>





