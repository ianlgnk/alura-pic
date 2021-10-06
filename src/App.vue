<template>
  <div class="body">
    <navbar :routes="routes" />
    <transition name="page-effect">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {
  components: {
    'navbar': Menu
  },
  data() {
    return {
      routes
    }
  }
}
</script>

<style>
.body {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}

.page-effect-enter, .page-effect-leave-active {
    opacity: 0;
}

.page-effect-enter-active, .page-effect-leave-active {
    transition: opacity 0.2s;
}

</style>