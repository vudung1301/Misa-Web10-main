<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left__toggle">
        <span class="tooltip"
          >Thu gọn - mở rộng menu
          <div class="tooltip-top"></div>
        </span>
      </div>
      <div class="header-left__title">CÔNG TY CỔ PHẦN MISA</div>
    </div>
    <div class="header-right">
      <div class="header-right__notify">
        <button class="btn" id="btn-notify"></button>
        <span class="tooltip"
          >Thông báo
          <div class="tooltip-top"></div>
        </span>
      </div>
      <div class="header-right__avatar"></div>
      <div class="header-right__user-name">
        <span>Vũ Văn Dũng</span>
        <div class="user-name__icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  components: {},
};
</script>

<style scoped></style>
