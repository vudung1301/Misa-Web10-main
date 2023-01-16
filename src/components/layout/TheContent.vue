<template>
  <div>
  <div class="content">
    <div class="content-header">
      <div class="content-header__title">Nhân viên</div>
      <button @click="onShowDetail" id="btnAdd" class="btn btn-add">
        Thêm nhân viên mới
      </button>
    </div>
    <div class="content-body">
      <EmployeeList
        @onAddFuncCopy="onShowDetailFunction"
        :statushide="this.statusHide"
        :checkload="this.checkLoad"
        @addFunction="onShowDetailFunction"
        :onloading="this.onLoadData"
      ></EmployeeList>
    </div>
  </div>
  <EmployeeDetail
    @onHideNo="onCloseAll"
    @onAddClick="onShowToast"
    @onClickDetail="onHideDeail"
    @onAddLoading="onLoadingData"
    :statusEmp="this.statusEmp"
    :emp="this.employee"
    v-if="isShowDetail"
  ></EmployeeDetail>
  <MISAToastSucess
    :statusEmp="this.statusEmp"
    v-if="isShowToast"
  ></MISAToastSucess>
  </div>
</template>

<script>
import EmployeeList from "../view/EmployeeList.vue";
import EmployeeDetail from "../view/EmployeeDetail.vue";
import MISAToastSucess from "../base/MISAToastSucess.vue";
export default {
  name: "TheContent",
  emits:["onAddLoading"],
  components: {
    EmployeeList,
    EmployeeDetail,
    MISAToastSucess,
  },
  props: ["statusHide"],
  created() {},
  methods: {
    onLoadingData() {
      this.onLoadData = !this.onLoadData;
    },
    onCloseAll() {
      this.isShowDetail = false;
    },
    /**
     * Hiển thị EmployeeDetail và đặt giá trị statusEmp = newEmployee
     * Author: DungNP (15/12/2022)
     */
    onShowDetail() {
      try {
        //Đây là thêm mới
        this.isShowDetail = true;
        this.statusEmp = "newEmployee";
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ẩn EmployeeDetail và hiển thị Toast thành công
     * Author: DungNP (15/12/2022)
     */
    onHideDeail() {
      try {
        this.isShowDetail = false;
        //Reload lại data
        this.$emit("onLoadData");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị Toast thành công
     * Author: DungNP (15/12/2022)
     */
    onShowToast(statusemp, check) {
      try {
        if (check == true) {
          //Không đóng form chi tiết
          this.isShowDetail = true;
        } else {
          //Đóng form chi tiết
          this.isShowDetail = false;
        }
        this.statusEmp = statusemp;
        this.isShowToast = true;
        this.checkLoad = !this.checkLoad;

        //Sau 5 giây sẽ tắt Toast
        setTimeout(() => (this.isShowToast = false), 5000);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị form chi tiết khi double click vào row
     * Author: DungNP (15/12/2022)
     */
    onShowDetailFunction(item, status) {
      try {
        if (status == "copy") {
          //Đây là copy
          this.employee = item;
          this.statusEmp = "copyEmployee";
        } else {
          //Đây là sửa
          //Gán giá trị item cho employee
          this.employee = item;
          this.statusEmp = "editEmployee";
        }

        //Hiển thị form chi tiết
        this.isShowDetail = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      isShowDetail: false,
      statusEmp: "",
      isShowToast: false,
      employee: [],
      checkLoad: false,
      onLoadData: false,
    };
  },
};
</script>

<style scoped></style>
