<template>
  <div class="dialog">
    <div class="dialog-writing">
      <div class="dialog-writing__body">
        <div class="dialog__header">
          <div class="dialog__header-left">
            <span>Thông báo</span>
          </div>
          <div class="dialog__header-right">
            <div
              @click="hideWarning"
              class="btn-dialog__close icon-btn btn-close"
            ></div>
            <span class="tooltip"
              >Đóng (ESC)
              <div class="tooltip-top"></div>
            </span>
          </div>
        </div>
        <div class="dialog__content">
          <div
            v-for="(item, index) in errormsg"
            :key="index"
            class="content-item"
          >
            <div class="content-item__text">
              {{ item }}
            </div>
          </div>
          <div v-if="this.isShowContentDelete" class="content-item">
            <div class="content-item__text">
              <div v-html="this.titleDelete"></div>
            </div>
          </div>
        </div>
        <div class="dialog-writing__footer">
          <div>
            <button
              v-bind:class="{ hideBtn: this.hideBtnCancelChange }"
              @click="hideWarning"
              class="btn btn-outline"
            >
              Huỷ
            </button>
          </div>
          <div>
            <button
              @click="hideWarningNo"
              v-bind:class="{ hideBtn: this.hideBtnCancel }"
              class="btn btn-outline"
            >
              Không
            </button>
            <button
              @click="deleteEmployee"
              v-bind:class="{ hideBtn: this.hideBtnDelete }"
              class="btn btn-add"
              id="btn-delete"
            >
              Xoá
            </button>
            <button
              @click="hideWarning(this.textCenter)"
              v-bind:class="{ hideBtn: this.hideBtnAgee, textCenter }"
              class="btn btn-add"
            >
              {{ this.contentBtnAgree }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAWarning",
  components: {},
  props: [
    "errorMsg",
    "hidebtn",
    "dataemp",
    "checkChangeData",
    "totalSelect",
    "statusdelete",
    "employeeID",
  ],
  watch: {},
  created() {
    /**
     * Xử lý ẩn hiện button Đồng ý, button Huỷ và button Xoá theo chức năng
     * Author: DungNP (18/12/2022)
     */
    this.errormsg = this.errorMsg;
    //Nếu data emp khác null và totalselect lớn hơn 0 thì:
    if (this.dataemp || this.totalSelect > 0) {
      //Hiển thị button xoá
      this.hideBtnDelete = false;
      //Hiển thị button huỷ
      this.hideBtnCancelChange = false;
      //hiển thị thông báo xoá
      this.isShowContentDelete = true;
      //Nếu data emp khác null thì:
      if (this.statusdelete === true) {
        //Đặt lại title xoá
        this.titleDelete = `Bạn có thực sự muốn xoá Nhân viên
              <b>${this.dataemp.empName}</b> không?`;
      }
      //Nếu totalselect lớn hơn 0 thì:
      else if (this.statusdelete === false) {
        //Đặt lại title xoá
        this.titleDelete = `Bạn có thực sự muốn xoá<b> ${this.totalSelect} bản ghi</b> đã chọn không?`;
      }
    } else if (
      this.errormsg.length > 0 &&
      !this.dataemp &&
      this.errormsg[0] != "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
    ) {
      //Hiển thị button đồng ý - ẩn button xoá- button huỷ - button không
      this.hideBtnAgee = false;
      //Đổi text button thành đồng ý
      this.contentBtnAgree = "Đồng ý";
    } else if (
      this.checkChangeData &&
      this.errormsg.length == 1 &&
      this.errormsg[0] == "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
    ) {
      //Đổi text button thành có
      this.contentBtnAgree = "Có";
      //Hiển thị button Có
      this.hideBtnAgee = false;
      //Cho text ra giữa
      this.textCenter = true;
      //Hiển thị button không
      this.hideBtnCancel = false;
      //Hiển thị button huỷ
      this.hideBtnCancelChange = false;
    }
  },
  methods: {
    /**
     * Xoá nhân viên
     * Author: DungNP (18/12/2022)
     */
    deleteEmployee() {
      try {
        //Nếu giá trị status delete bằng true thì:
        if (this.statusdelete === true) {
          //Gọi API xoá 1 nhân viên
          this.axios
            .delete(
               "https://amis.manhnv.net/api/v1/Employees/" + this.dataemp.empId
              //"http://localhost:56263/api/v1/Employees/" + this.dataemp.empId
            )
            .then(() => {
              //Ẩn dialog
              this.$emit("onAddDelete", true);
            });
        }
        //Nếu giá trị status delete bằng false thì:
        else if (this.statusdelete === false) {
          //Gọi API xoá nhiều nhân viên
          for (const item of this.employeeID) {
            this.axios
              .delete("https://amis.manhnv.net/api/v1/Employees/" + item)
              .then(() => {});
          }
          //Ẩn dialog
          this.$emit("onAddDelete", true);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Tạo sự kiên đóng warning, đóng form chi tiết và lưu dữ liệu
     * Author: DungNP (19/12/2022)
     */
    hideWarningAndSave() {
      try {
        this.$emit("onAddClickSave");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Tạo event đóng warning và đóng form chi tiết
     * Author: DungNP (19/12/2022)
     */
    hideWarningNo() {
      try {
        this.$emit("onAddClickNo");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Ẩn dialog Warning
     * Author: DungNP (17/12/2022)
     */
    hideWarning(issavedata) {
      try {
        this.$emit("onAddClick", issavedata);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      errormsg: [],
      hideBtn: false,
      isShowContentDelete: false,
      isShowBtnAgree: false,
      isShowBtnDelete: false,
      hideBtnCancel: true,
      hideBtnDelete: true,
      hideBtnCancelChange: true,
      hideBtnYesChange: true,
      contentBtnCancel: "",
      contentBtnAgree: "",
      textCenter: false,
      hideBtnAgee: true,
      titleDelete: "",
    };
  },
};
</script>

<style scoped>
#btn-delete {
  background-color: #e60000;
  text-align: center;
}
#btn-delete:hover {
  background-color: #eb3333;
}
#btn-delete:active {
  background-color: #b80000;
}

.dialog-writing__footer {
  display: flex;
  justify-content: space-between;
}
.textCenter {
  text-align: center;
}
</style>
