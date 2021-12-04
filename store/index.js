import axios from 'axios';

export const state = () => ({
  globalParams: null,
  authUser: null,
  status: 0,
  menu: null,
  tableRFixed: false,
  isCollapse: false,
  menuTitle: null,
  activeMenu: null,
  rebackUrl: '/',
  rebackQuery: null,
  switchArray: [ 'tableRFixed' ]
});

export const mutations = {
  SET_GLOBAL_PARAMS: function(state, data) {
    state.globalParams = data;
  },
  SET_MENU: function(state, data) {
    state.menu = data;
  },
  SET_USER: function(state, data) {
    state.authUser = data;
  },
  SET_MENU_TITLE: function(state, data) {
    state.menuTitle = data;
  },
  SET_ACTIVE_MENU: function(state, data) {
    state.activeMenu = data;
  },
  SET_USER_STATUS: function(state, data) {
    state.status = parseInt(data);
  },
  SET_REBACK_URL: function(state, data) {
    state.rebackUrl = data;
  },
  SET_REBACK_QUERY: function(state, data) {
    state.rebackQuery = data;
  },
  SET_LIST_TABLE_FIXED: function(state, data) {
    state.tableRFixed = data;
  }
};

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit }, { req }) {
    if (req.ctx.globalParams) {
      commit('SET_GLOBAL_PARAMS', req.ctx.globalParams);
    }
    if (this.$cookies.get('jasonAdminUser')) {
      commit('SET_USER', this.$cookies.get('jasonAdminUser'));
    }
    for (let i = 0; i < this.state.switchArray.length; i++) {
      let key = this.state.switchArray[i];
      if (this.$cookies.get(key)) this.state[key] = this.$cookies.get(key);
    }
  },
  async login({ commit }, { id_token }) {
    try {
      let data;
      let fqdn = this.state.globalParams.fqdn;
      const rs = await axios.post(`${fqdn}/admin/auth/login`, {
        apiLog: { action: '登入' }, 
        token: id_token
      });
      switch (rs.data.data.status) {
        case -1:
          return { err: '無註帳帳號。' };
        case 0:
          return { err: '無權限帳號，請連絡AC!!' };
        case 1:
          data = {
            email: rs.data.data.email,
            nickname: rs.data.data.nickname,
            uid: rs.data.data.uid,
            ak: rs.data.ak,
            avatar: rs.data.data.avatar
          };
          this.$cookies.set('jasonAdminUser', data, {
            path: '/',
            //maxAge: 60 * 60 * 24 * 7
            maxAge: 60 * 60 * 2
          });
          if (this.$cookies.get('rebackUrl')) {
            commit('SET_REBACK_URL', this.$cookies.get('rebackUrl'));
            this.$cookies.remove('rebackUrl');
          }
          if (this.$cookies.get('rebackQuery')) {
            commit('SET_REBACK_QUERY', this.$cookies.get('rebackQuery'));
            this.$cookies.remove('rebackQuery');
          }
          await commit('SET_USER', data);
          await commit('SET_USER_STATUS', rs.data.data.status);
          return {};
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials');
      }
      throw error;
    }
  },

  async logout({ commit }) {
    let fqdn = this.state.globalParams.fqdn;
    let user = this.$cookies.get('jasonAdminUser');
    if (user) await axios.post(`${fqdn}/admin/auth/logout`, { 
      apiLog: { action: '登出' }, 
      uid: user.uid 
    });
    this.$cookies.remove('jasonAdminUser');
    commit('SET_USER', null);
  },
  //  取得使用者菜單權限與帳號狀態
  async getMenuAndStatus({ commit }) {
    let fqdn = this.state.globalParams.fqdn;
    if (this.state.authUser) {
      this.$cookies.set('jasonAdminUser', this.state.authUser, {
        path: '/',
        //maxAge: 60 * 60 * 24 * 7
        maxAge: 60 * 60 * 2
      });
      const menu = await axios.post(`${fqdn}/graphql`, {
        timeout: 0,
        apiLog: false, 
        query: `query{
          menuConfig(uid: "${this.state.authUser.uid}"){id,icon,label,link,children{label,type,link,id}}, 
          admin(uid: "${this.state.authUser.uid}"){status}
        }`
      });

      let redashFqdn = this.state.globalParams.redashFqdn;
      let menuRes = menu.data.data.menuConfig || [];
      menuRes = menuRes.filter(
        page => page.children.length > 0 || page.link != null
      );

      menuRes.forEach(row => {
        row.children.forEach(row2 => {
          if (row2.type == 'redash') {
            row2.link = redashFqdn + row2.link;
          }
        });
      });
      let status = menu.data.data.admin[0]
        ? menu.data.data.admin[0].status
        : -1;
      await commit('SET_USER_STATUS', status);
      await commit('SET_MENU', menuRes);
    }
  },
  setMenuTitle: ({ commit }, data)=> commit('SET_MENU_TITLE', data),
  async setActiveMenu({ commit }, path) {
    commit('SET_ACTIVE_MENU', path);
  },
  async setActiveSwitch({ commit }, data) {
    if (data.type == 'tableRFixed') commit('SET_LIST_TABLE_FIXED', data.value);
    else return;

    this.$cookies.set(data.type, data.value);
  },
  async sendGraphQL({ commit }, { query, title, apiLog }) {
    let newApiLog = (apiLog != false) ? (apiLog || {}) : false;
    if (newApiLog) newApiLog.path = title;
    return await axios.post(`${this.state.globalParams.fqdn}/graphql`, { 
      query: query, 
      apiLog: newApiLog 
    });
  },
  async sendAdminApi({ commit }, { path, data, title, apiLog, reqInfo }) {
    let newApiLog = (apiLog != false) ? (apiLog || {}) : false;
    if (newApiLog) newApiLog.path = title;
    let newData = data || {};
    newData.apiLog = newApiLog;
    return await axios.post(`${this.state.globalParams.fqdn}${path}`, newData, reqInfo);
    
  },
  async localLogin({ commit }, data) {
    try {
      let fqdn = this.state.globalParams.fqdn;
      const res = await axios.post(`${ fqdn }/graphql`, {
        timeout: 0,
        apiLog: false,
        query: `query{
          admin(uid: "${data.account}") { email,nickname,uid,memo }
        }`
      });
      if (res.data.data.admin.length == 0) return { err: '帳號密碼錯誤' };
      if (data.psw != res.data.data.admin[ 0 ].memo) return { err: '帳號密碼錯誤' };
      this.$cookies.set('jasonAdminUser', res.data.data.admin[ 0 ], {
        path: '/',
        //maxAge: 60 * 60 * 24 * 7
        maxAge: 60 * 60 * 2,
      });
      if (this.$cookies.get('rebackUrl')) {
        commit('SET_REBACK_URL', this.$cookies.get('rebackUrl'));
        this.$cookies.remove('rebackUrl');
      }
      if (this.$cookies.get('rebackQuery')) {
        commit('SET_REBACK_QUERY', this.$cookies.get('rebackQuery'));
        this.$cookies.remove('rebackQuery');
      }
      await commit('SET_USER', res.data.data.admin[ 0 ]);
      await commit('SET_USER_STATUS', 1);
      return {};

    } catch (e) {
      throw '失敗: ' + e;
    }
  }
};
