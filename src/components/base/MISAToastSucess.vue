<template>
  <div class="toast-message_container">
    <div class="toast-message success">
      <div>
        <div class="toast-message__icon"></div>
        <div class="toast-message__title">Thành công!</div>
        <div class="toast-message__text">
          {{ title }}
        </div>
      </div>
      <div class="toast-message__close"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAToastSucess",
  props: ["statusEmp"],
  created() {
    //Thực hiện kiểm tra statusEmp xem là thêm mới hay sửa
    if (this.statusEmp == "newEmployee" || this.statusEmp == "copyEmployee") {
      this.title = "Thông tin nhân viên đã thêm mới thành công.";
    } else if (this.statusEmp == "editEmployee") {
      this.title = "Thông tin nhân viên đã lưu thay đổi thành công.";
    } else {
      this.title = "Thông tin nhân viên đã được xoá thành công.";
    }
  },
  methods: {},
  data() {
    return {
      title: "",
    };
  },
};
</script>

<style></style>
