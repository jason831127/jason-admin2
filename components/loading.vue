
<template lang="html">
  <div class="loading-page" v-if="loading">
    <div class="loader">
      <span>{</span>
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
      <span>}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.finish();
    });
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 1000;
}
.loading-page p {
  display: inline-block;
  height: .6em;
  margin: .19em;
  animation: loading 1s infinite alternate;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;  
}

body {
  display: flex;  
  justify-content: center;
  align-items: center;
  background-color: #4684ee;
}

.loader {
  color: #fff;
  font-family: Consolas, Menlo, Monaco, monospace;
  font-weight: bold;
  font-size: 3vh;
  opacity: 0.8;
}
.loader span {
  display: inline-block;
  animation: pulse 0.4s alternate infinite ease-in-out;
}
.loader span:nth-child(odd) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  to {
    transform: scale(0.8);
    opacity: 0.5;
  }
}
</style>