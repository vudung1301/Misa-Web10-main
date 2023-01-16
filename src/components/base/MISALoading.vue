<template>
  <div class="loading">
    <div class="loading__content">
      <div class="loading__icon"></div>
      <div class="loading__text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISALoading",
};
</script>

<style scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #8585852b;
  /* background-color: red; */
  z-index: 10;
  /* display: none; */
  margin-top: 108px;
  margin-left: 16px;
  margin-right: 16px;
   margin-bottom: 68px;
}

.loading__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: invert(14%) sepia(96%) saturate(2953%) hue-rotate(200deg) brightness(96%) contrast(101%);
}

.loading__icon {
  width: 32px;
  height: 32px;
  background-image: url(../../assets/loading.svg);
  background-repeat: no-repeat;
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
