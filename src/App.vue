<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 全局禁止用户缩放
document.addEventListener('DOMContentLoaded', function() {
  document.body.style.zoom = 'reset'
  document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey === true || event.metaKey === true) &&
      (event.which === 61 || event.which === 107 ||
          event.which === 173 || event.which === 109 ||
          event.which === 187 || event.which === 189)) {
      event.preventDefault()
    }
  }, false)
  document.addEventListener('mousewheel DOMMouseScroll', function(event) {
    if (event.ctrlKey === true || event.metaKey) {
      event.preventDefault()
    }
  }, false)
}, false)
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
