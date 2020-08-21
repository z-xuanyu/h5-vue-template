<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <tab-bar />
    </div>
  </div>
</template>

<script>
import TabBar from "./components/TabBar";
export default {
  components: {
    TabBar,
  },
};
</script>
<style lang="scss" scoped>

</style>