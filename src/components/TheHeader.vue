<template>
  <header class="wrap_header no-print">
    <nav class="content_nav">
      <ul class="nav_list">
        <li><router-link to="/">首頁</router-link></li>
        <!-- <li><router-link to="/editor">編輯器</router-link></li> -->
        <!-- <li><router-link to="/pdf-kit">pdf-kit</router-link></li> -->
        <!-- <li><router-link to="/html2canvas">html2canvas</router-link></li> -->
        <!-- <li><router-link to="/print">print</router-link></li> -->
        <li><router-link to="/echarts">echartsMap</router-link></li>
        <li><router-link to="/vue-code">Vue</router-link></li>
        <li><router-link to="/sign">電子簽名</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@media print {
  .no-print {
    display: none;
  }
}
.wrap_header {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 5px 0px 10px 0px rgb(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  margin-bottom: 20px;
}
.content_nav {
  width: 100%;
  // max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}
.header_logo {
  width: 3%;
}
.nav_list {
  display: flex;
}
.nav_logo {
  width: 160px;
}
.nav_list {
  li {
    position: relative;
    list-style: none;

    a {
      padding: 20px 10px;
      letter-spacing: 1px;
      white-space: nowrap;
      font-weight: bold;
      color: #2c3e50;
      transition: 0.3s ease-out;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
