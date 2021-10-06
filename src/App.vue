<template>
  <div class="body">
    <nav>
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path ? route.path : '/'">
            {{ route.title }}
          </router-link>
        </li>
      </ul>
    </nav>
    
    <transition name="page-effect">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from './routes';
export default {
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