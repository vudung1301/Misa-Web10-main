<template>
  <div>
  <div class="combobox__list">
    <div
      class="combobox-item combobox-active"
      positionname=""
      positionId=""
      @click="onSelectdPosition"
    >
      <div class="combobox__text">- Chọn giá trị -</div>
      <div class="combobox__icon"></div>
    </div>
    <div
      v-for="(item, index) in positions"
      :key="index"
      class="combobox-item"
      :depmid="item.PositionId"
      :positionname="item.PositionName"
      @click="onSelectdPosition(item)"
    >
      <div class="combobox__text">{{ item.PositionName }}</div>
      <div class="combobox__icon" hidden=""></div>
    </div>
  </div>
  <MISALoading v-show="isShowLoading"></MISALoading>
</div>
</template>

<script>
import MISALoading from "./MISALoading.vue";
export default {
  name: "ContextMenuPosition",
  components: { MISALoading },
  emits: ["onAddClickSelected"],
  props: ["datapositionname"],
  created() {
    this.getPosition();
  },

  updated() {
    //Kiểm tra xem item nào đang active
    var el = document.getElementsByClassName("combobox-item");
    for (const item of el) {
      if (item.getAttribute("positionname") == this.datapositionname) {
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
     * Lấy dữ liệu của bảng Position
     * Author: DungNP (16/12/2022)
     */
    getPosition() {
      try {
        //Hiển thị Loading
        this.isShowLoading = true;

        //Gọi API lấy dữ liệu trong bảng Position
        this.axios
          .get("https://amis.manhnv.net/api/v1/Positions")
          .then((res) => {
            //Ẩn Loading
            this.isShowLoading = false;

            //Gán data nhận được vào positions
            this.positions = res.data;
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện click chọn đơn vị
     * Author: DungNP (16/12/2022)
     */
    onSelectdPosition(item) {
      try {
        //Tạo sự kiện và gửi dữ liệu lên components cha
        this.$emit("onAddClickSelected", item);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      positions: {},
      isShowLoading: false,
    };
  },
};
</script>

<style scoped>
.combobox-item .combobox__icon {
  display: none;
}
.active > .combobox__icon {
  display: block;
}
</style>
