<template>
  <div id="app">
    <app-menu></app-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from './components/menu/AppMenu'
export default {
  name: 'app',
  components: {AppMenu}
}
</script>

<style>
#app {
  height:100%; 
}

#app::before {
  content: '';
  height: 100%;
  width: 100%;
  background-size: cover;
  background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
  z-index: -4;
  position: absolute;
}

#app:after {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -3;
    width: 100%;
    height: 50%;
    content: '';
    background-size: cover;
    opacity: 0;
    background-color :#000;
}
</style>
