<template>
  <div>
  <div class="combobox__list">
    <div
      class="combobox-item combobox-active"
      depmname=""
      depmid=""
      @click="onSelectdDepartment"
    >
      <div class="combobox__text">- Chọn giá trị -</div>
      <div class="combobox__icon"></div>
    </div>
    <div
      v-for="(item, index) in departments"
      :key="index"
      class="combobox-item"
      :depmid="item.DepartmentID"
      :depmname="item.DepartmentName"
      @click="onSelectdDepartment(item)"
    >
      <div class="combobox__text">{{ item.DepartmentName }}</div>
      <div class="combobox__icon"></div>
    </div>
  </div>
  <MISALoading v-show="isShowLoading"></MISALoading>
  </div>
</template>

<script>
import MISALoading from "./MISALoading.vue";
export default {
  name: "ContextMenuDepartment",
  components: { MISALoading },
  emits: ["onAddClickSelected"],
  props: ["datadepmname"],
  created() {
    //Gọi api lấy dữ liệu department
    this.getDepartment();
  },
  updated() {
    //Kiểm tra xem item nào đang active
    var el = document.getElementsByClassName("combobox-item");
    for (const item of el) {
      if (item.getAttribute("depmname") == this.datadepmname) {
        //Add class active
        item.setAttribute("class", "combobox-item combobox-active active");
      } else {
        //Remove class active
        item.setAttribute("class", "combobox-item");
      }
    }
  },
  methods: {
    /**
     * Lấy dữ liệu của bảng Department
     * Author: DungNP (16/12/2022)
     */
    getDepartment() {
      try {
        //Hiển thị Loading
        this.isShowLoading = true;

        //Gọi API lấy dữ liệu trong bảng Department
        this.axios
          .get("http://localhost:5168/api/v1/Departments")
          .then((res) => {
            //Ẩn Loading
            this.isShowLoading = false;

            //Gán data nhận được vào departments
            this.departments = res.data;
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện click chọn đơn vị
     * Author: DungNP (16/12/2022)
     */
    onSelectdDepartment(item) {
      try {
        this.departmentsItem = item;
        //Tạo sự kiện và gửi dữ liệu lên components cha
        this.$emit("onAddClickSelected", item);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      departments: {},
      isShowLoading: false,
      departmentsItem: {},
    };
  },
};
</script>

<style scoped>
.combobox__list {
  z-index: 99;
}
.combobox-item .combobox__icon {
  display: none;
}
.active > .combobox__icon {
  display: block;
}
</style>
