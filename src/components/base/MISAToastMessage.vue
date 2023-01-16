<template>
  <div class="toast-message_container">
    <div class="toast-message success">
      <div>
        <div class="toast-message__icon"></div>
        <div class="toast-message__title">Thành công!</div>
        <div class="toast-message__text">Công việc đã bị xoá.</div>
      </div>
      <div class="toast-message__close"></div>
    </div>
    <div class="toast-message error">
      <div>
        <div class="toast-message__icon"></div>
        <div class="toast-message__title">Lỗi!</div>
        <div class="toast-message__text">Không thể cập nhật được dữ liệu.</div>
      </div>
      <div class="toast-message__close"></div>
    </div>
    <div class="toast-message warning">
      <div>
        <div class="toast-message__icon"></div>
        <div class="toast-message__title">Cảnh báo!</div>
        <div class="toast-message__text">
          Dữ liệu của bạn đã bị thay đổi bởi người dùng khác.
        </div>
      </div>
      <div class="toast-message__close"></div>
    </div>
    <div class="toast-message info">
      <div>
        <div class="toast-message__icon"></div>
        <div class="toast-message__title">Thông tin!</div>
        <div class="toast-message__text">
          Bạn nên đọc kỹ nội dung trước khi gửi phê duyệt.
        </div>
      </div>
      <div class="toast-message__close"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAToastMessage",
};
</script>

<style></style>
