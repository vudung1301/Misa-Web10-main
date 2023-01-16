<template>
  <div class="container" @click="onHideContextTable">
    <TheSidebar></TheSidebar>
    <div class="main">
      <TheHeader></TheHeader>
      <TheContent :statusHide="this.statusHide"></TheContent>
    </div>
  </div>
</template>

<script>
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheContent from "./components/layout/TheContent.vue";
export default {
  name: "App",
  components: { TheSidebar, TheHeader, TheContent },
  methods: {
    /**
     * Tạo sự kiện ẩn Context menu table
     * Author: DungNP (18/12/2022)
     */
    onHideContextTable() {
      this.statusHide = !this.statusHide;
    },
  },
  data() {
    return {
      statusHide: true,
    };
  },
};
</script>

<style>
@import url(./css/main.css);
</style>
