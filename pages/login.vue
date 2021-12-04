<template>
  <el-main>
    <div id="login">
      <div class="accountbg"></div>
      <el-card class="box-card loginCard">
        <div slot="header"
             style="text-align: center;">
          <!-- <img src="@/assets/img/logo2.png"
               height="60"
               style="margin-right: 10px;"> -->
          <div class="loginTitle">Jason 管理後台</div>
        </div>
        <div style="text-align: center;margin-bottom: 10px;" class="accountLog">
          <el-input v-model="account" placeholder="帳號"></el-input>
          <el-input v-model="psw" placeholder="密碼" show-password></el-input>
          <el-button type="success" @click="useAccountLogin()">登入</el-button>
        </div>
        <div style="text-align: center;">
          <NoSsr>
            <GoogleLogin class="el-button el-button--primary"
                         :client_id="params.googleOauth.client_id"
                         :onSuccess="onSuccess"
                         :onFailure="onFailure">Google 登入</GoogleLogin>
          </NoSsr>
        </div>
      </el-card>
    </div>
  </el-main>
</template>
<script>
import GoogleLogin from 'vue-google-login';

export default {
  head: { titleTemplate: `%s | 登入` },
  middleware: ['getGlobalParams'],
  asyncData(context) {
    return {
      params: context.store.state.globalParams,
      query: context.query,
      account: null,
      psw: null
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    async useAccountLogin(){
      let result = await this.$store.dispatch('localLogin', {
        account: this.account, 
        psw: this.psw
      });
      if (result.err) this.$message({ type: 'error', message: result.err })
      else {
        
        let query = this.$store.state.rebackQuery || {};
        query.message = '喲，還學會登入了喔🤔';
        await this.$nuxt.$router.push({ path: this.$store.state.rebackUrl, query: query, shallow: true });
      }
    },
    async onSuccess(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      //console.log(googleUser.getBasicProfile().Paa);
      //nuxt client redirect solution

      let id_token = googleUser.getAuthResponse().id_token;
      let result = await this.$store.dispatch('login', { id_token: id_token })
      if (result.err) this.$message({ type: 'error', message: result.err })
      else {
        let query = this.$store.state.rebackQuery || {};
        query.message = '喲，還學會登入了喔🤔';
        await this.$nuxt.$router.push({ path: this.$store.state.rebackUrl, query: query, shallow: true });
      }
    },
    onFailure(error) {
      this.$message({ type: 'error', message: error.error, center: true });
      console.error(error);
    }
  },
  mounted() {
    if (this.$store.state.authUser) this.$store.dispatch('logout');
    if (this.query.message) this.$message({ message: this.query.message, center: true, type: 'warning' });
  }
};
</script>

<style scope>
  .accountLog input{
    margin-bottom: 5px;
  }

  #login {
    max-width: 500px;
    margin: auto;
    margin-top: 10vh;
  }

  #login .el-card .el-card__header {
    border-bottom: none;
  }

  #login .accountbg {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
  }

  #login .el-form-item__label {
    color: #fff;
  }

  #login .el-card.is-always-shadow {
    position: relative;
    z-index: 10;
    box-shadow: 0 0 20px #888;
    background-color: rgba(255, 255, 255, 0.3);
    color: #333;
  }

  #login .el-card.is-always-shadow::after {
    content: "";
    opacity: 0.2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  .loginTitle {
    font-family: "PingFang SC",Arial,sans-serif,Helvetica,serif;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    margin-bottom: -30px;
    margin-top: 10px;
  }
</style>