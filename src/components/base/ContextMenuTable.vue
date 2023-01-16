<template>
  <div class="context-menu">
    <div
      @click="showDetail('copy')"
      id="btnCopyFunc"
      class="context-menu__item"
    >
      <span>Nhân bản</span>
    </div>
    <div
      @click="showDlgWarning"
      id="btnDeleteFunc"
      class="context-menu__item"
      :dataempid="this.dataobj.EmployeeId"
    >
      <span>Xoá</span>
    </div>
    <div
      id="btnStopFunc"
      class="context-menu__item"
      v-bind:class="{ disabled }"
    >
      <span v-bind:class="{ disabled }">Ngừng sử dụng</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenuTable",
  components: {},
  props: ["dataobj"],
  created() {},
  methods: {
    /**
     * Thực hiện hiển thị Warning
     * Author: DungNP (15/12/2022)
     */
    showDlgWarning() {
      try {
        this.$emit("addClickFunc", this.dataobj, true);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện tạo event để hiển thị form chi tiết
     * Author: DungNP (19/12/2022)
     */
    showDetail(status) {
      try {
        this.$emit("addClickFuncCopy", this.dataobj, status);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      dataobjEmp: {},
      disabled: true,
    };
  },
};
</script>

<style scoped>
.disabled {
  cursor: no-drop;
  color: #a2a2a2;
}
.disabled:hover {
  background-color: #fff;
}
</style>
