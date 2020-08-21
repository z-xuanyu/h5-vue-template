<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <tab-bar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from "./components/TabBar";
export default {
  components: {
    TabBar,
  },
  data() {
    return {
      tabbars: [
        {
          title: "首页",
          to: {
            name: "Home",
          },
          icon: "home-o",
        },
        {
          title: "我的",
          to: {
            name: "Me",
          },
          icon: "user-o",
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>
<style lang="scss" scoped></style>
