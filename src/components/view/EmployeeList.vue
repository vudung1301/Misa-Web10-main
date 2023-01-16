<template>
  <div>
  <div class="content-body__toolbar" @click="this.isShowContext = false">
    <div class="toolbar-left">
      <button
        @click="onDeletes"
        :class="{ hidebtndelete }"
        class="btn btn-add btn-delete"
      >
        Xoá
      </button>
    </div>

    <input
      @keydown.enter="onFilterPaging"
      v-model="this.employeeFilter"
      class="input"
      type="text"
      placeholder="Tìm theo mã, tên nhân viên"
    />
    <div @click="onFilterPaging" class="search__icon"></div>
    <button @click="refreshData" class="btn toolbar__refresh"></button>
    <span class="tooltip"
      >Lấy lại dữ liệu
      <div class="tooltip-top"></div>
    </span>
  </div>
  <div
    class="content-body__table scrollbar"
    @click="this.isShowContext = false"
  >
    <table class="table-viewer">
      <thead class="thead-viewer">
        <tr class="thead-viewer__tr">
          <th class="thead-viewer__th" title="Chọn tất cả">
            <label
              class="column-checkbox checkbox-all"
              ref="checkboxall"
              checked="false"
            >
              <input
                @click="onCheckAllRow"
                class="column-checkbox__input"
                type="checkbox"
              />
              <div class="column-checkbox__icon"></div>
            </label>
          </th>
          <th class="thead-viewer__th" title="Mã nhân viên">MÃ NHÂN VIÊN</th>
          <th class="thead-viewer__th" title="Tên nhân viên">TÊN NHÂN VIÊN</th>
          <th class="thead-viewer__th" title="Giới tính">GIỚI TÍNH</th>
          <th class="thead-viewer__th" title="Ngày sinh">NGÀY SINH</th>
          <th class="thead-viewer__th" title="Tên đơn vị">TÊN ĐƠN VỊ</th>
          <th class="thead-viewer__th" title="Chức danh">CHỨC DANH</th>
          <th class="thead-viewer__th" title="Tiền lương">TIỀN LƯƠNG</th>
          <th class="thead-viewer__th" title="Số chứng minh nhân dân">
            SỐ CMND
          </th>
          <th class="thead-viewer__th" title="Ngày cấp">NGÀY CẤP</th>
          <th class="thead-viewer__th" title="Nơi cấp">NƠI CẤP</th>
          <th class="thead-viewer__th" title="Địa chỉ">ĐỊA CHỈ</th>
          <th class="thead-viewer__th" title="Điện thoại di động">
            ĐT DI ĐỘNG
          </th>
          <th class="thead-viewer__th" title="Email">EMAIL</th>
          <th class="thead-viewer__th" title="Tài khoản ngân hàng">
            TK NGÂN HÀNG
          </th>
          <th class="thead-viewer__th" title="Tên ngân hàng">TÊN NGÂN HÀNG</th>
          <th class="thead-viewer__th" title="Chi nhánh">CHI NHÁNH</th>
          <th class="thead-viewer__th" title="Chức năng">CHỨC NĂNG</th>
        </tr>
      </thead>
      <tbody class="tbody-viewer">
        <tr
          v-for="(item, index) in employees"
          :key="index"
          class="tbody-viewer__tr"
          @dblclick="onRowDblClick(item)"
        >
          <td class="tbody-viewer__td">
            <label
              class="column-checkbox"
              ref="checkbox"
              checked="false"
              :dataobj="item.EmployeeId"
            >
              <input
                @click="onCheckedRow"
                class="column-checkbox__input"
                type="checkbox"
              />
              <div class="column-checkbox__icon"></div>
            </label>
          </td>
          <td id="thanhcanh" class="tbody-viewer__td">
            {{ item.EmployeeCode }}
          </td>
          <td class="tbody-viewer__td">{{ item.EmployeeName }}</td>
          <td class="tbody-viewer__td">{{ formatGender(item.Gender) }}</td>
          <td class="tbody-viewer__td td-datetime">
            {{
              formatDate(item.DateOfBirth) == "01/01/1970" ||
              formatDate(item.DateOfBirth) == "NaN/NaN/NaN"
                ? ""
                : formatDate(item.DateOfBirth)
            }}
          </td>
          <td class="tbody-viewer__td">{{ item.DepartmentName }}</td>
          <td class="tbody-viewer__td">{{ item.PositionName }}</td>
          <td class="tbody-viewer__td td-number">
            {{ formatSalary(item.Salary) || 0 }}
          </td>
          <td class="tbody-viewer__td">{{ item.IdentityNumber }}</td>
          <td class="tbody-viewer__td td-datetime">
            {{
              formatDate(item.IdentityIssueDate) == "01/01/1970" ||
              formatDate(item.IdentityIssueDate) == "NaN/NaN/NaN"
                ? ""
                : formatDate(item.IdentityIssueDate)
            }}
          </td>
          <td class="tbody-viewer__td">{{ item.IdentityIssuePlace }}</td>
          <td class="tbody-viewer__td">{{ item.Address }}</td>
          <td class="tbody-viewer__td">{{ item.PhoneNumber }}</td>
          <td class="tbody-viewer__td">{{ item.Email }}</td>
          <td class="tbody-viewer__td">{{ item.BankAccountNumber }}</td>
          <td class="tbody-viewer__td">{{ item.BankName }}</td>
          <td class="tbody-viewer__td">{{ item.BankBranchName }}</td>
          <td class="tbody-viewer__td">
            <div class="column-func">
              <button
                id="btnedit"
                class="column-item btn-edit"
                @click="onRowDblClick(item)"
              >
                <span>Sửa</span>
              </button>
              <button
                :data-empid="item.EmployeeId"
                :data-empcode="item.EmployeeCode"
                @click.stop="showContextMenu($event, item)"
                id="btnFunc"
                class="column-item btn-function"
              ></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <MISALoading v-show="isShowLoading"></MISALoading>
  <div class="content-body__paging" @click="this.isShowContext = false">
    <div class="paging-left">
      <div class="paging-left__total-record">
        Tổng: <b>{{ this.totalRecord }}</b>
      </div>
    </div>
    <div class="paging-right">
      <div class="paging-right_title">
        Số bản ghi/trang: <b>{{ this.pageSize }}</b>
      </div>
      <div class="paging-right_combobox">
        <button
          @click.stop="onShowPaging"
          title="Số bản ghi muốn hiển thị"
          class="btn-combobox"
          id="btn-paging"
        ></button>
        <div class="list-record" :hidden="this.hideContextMenuPaging">
          <div @click="getPageSize" class="list-record__item active" value="10">
            <div class="record__text">10</div>
            <div @click="onShowActive" class="record__icon"></div>
          </div>
          <div @click="getPageSize" class="list-record__item" value="25">
            <div class="record__text">25</div>
            <div @click="onShowActive" class="record__icon"></div>
          </div>
          <div @click="getPageSize" class="list-record__item" value="50">
            <div class="record__text">50</div>
            <div @click="onShowActive" class="record__icon"></div>
          </div>
          <div @click="getPageSize" class="list-record__item" value="100">
            <div class="record__text">100</div>
            <div @click="onShowActive" class="record__icon"></div>
          </div>
        </div>
      </div>
      <div class="paging-right_count">
        {{ this.recordStart }} - <b>{{ this.recordEnd }}</b> bản ghi
      </div>
      <div class="paging-right_pre">
        <button
          v-bind:class="{ btnPreNone }"
          @click="prePage"
          title="Trang trước đó"
          class="btn-pre"
        ></button>
      </div>
      <div class="paging-right_next">
        <button
          v-bind:class="{ btnNextNone }"
          @click="nextPage"
          title="Trang kế tiếp"
          class="btn-next"
        ></button>
      </div>
    </div>
  </div>
  <ContextMenuTable
    @addClickFuncCopy="onShowDetail"
    @addClickFunc="onShowWarning"
    :dataobj="this.dataobj"
    :style="{ top: this.positionTop, left: this.positionLeft }"
    v-if="isShowContext"
  ></ContextMenuTable>
  <MISAWarning
    @onAddClick="this.isShowWarning = false"
    @onAddDelete="onHideWarning"
    @hideFunc="onHideWarning"
    :dataemp="this.dataemp"
    v-if="isShowWarning"
    :statusdelete="this.statusDelete"
    :totalSelect="this.totalSelected"
    :employeeID="this.employeeID"
  ></MISAWarning>
  <MISAToastSucess v-show="this.isShowToast"></MISAToastSucess>
  </div>
</template>

<script>
import MISALoading from "../base/MISALoading.vue";
import ContextMenuTable from "../base/ContextMenuTable.vue";
import MISAWarning from "../base/MISAWarning.vue";
import MISAToastSucess from "../base/MISAToastSucess.vue";
export default {
  name: "EmployeeList",
  emits: ["onAddFuncCopy", "addFunction"],
  components: {
    MISALoading,
    ContextMenuTable,
    MISAWarning,
    MISAToastSucess,
  },
  props: ["checkload", "statushide", "onloading"],
  watch: {
    onloading() {
      this.getEmployees();
    },
    checkload() {
      //Reset lại paging
      this.onResetPaging();
      this.getEmployees();
    },

    statushide() {
      this.isShowContext = false;
      this.hideContextMenuPaging = true;
    },

    totalSelected() {
      if (this.totalSelected > 0) {
        this.hidebtndelete = false;
      } else {
        this.hidebtndelete = true;
      }
    },

    isCheckedAll() {
      if (this.isCheckedAll == false) {
        //Bỏ checked ô check all
        this.$refs.checkboxall.classList.value =
          this.$refs.checkboxall.classList[0] +
          " " +
          this.$refs.checkboxall.classList[1];
        //Đặt thuộc tính checked = false
        this.$refs.checkboxall.attributes[1].value = "false";
      }
    },

    /**
     * Theo dõi sự thay đổi giá trị của pageSize
     * Author: DungNP (21/12/2022)
     */
    pageSize() {
      try {
        //Reset lại paging
        this.onResetPaging();
        //Gọi API lấy lại toàn bộ dữ liệu
        this.getEmployees();

        if (this.employeeFilter) {
          //Nếu giá trị offSet + giá trị pageSize mà lớn hơn tổng số bản ghi thì:
          if (this.offSet + this.pageSize > this.totalRecord) {
            //Ẩn nút Next
            this.btnNextNone = true;
            //Gán giá trị trang cuối bằng tổng số bản ghi
            this.recordEnd = this.totalRecord;
          } else {
            //Ngược lại thì:
            //Hiển thị nút Next
            this.btnNextNone = false;
          }
        } else {
          //Nếu giá trị offSet + giá trị pageSize mà lớn hơn tổng số bản ghi thì:
          if (this.offSet + this.pageSize > this.totalRecord) {
            //Ẩn nút Next
            this.btnNextNone = true;
            //Gán giá trị trang cuối bằng tổng số bản ghi
            this.recordEnd = this.totalRecord;
          } else {
            //Ngược lại thì:
            //Hiển thị nút Next
            this.btnNextNone = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Theo dõi sự thay đổi giá trị của pageNumber
     * Author: DungNP (21/12/2022)
     */
    pageNumber() {
      try {
        //Đặt lại giá trị checkbox
        this.unCheckAllRow();
        //Đặt lại giá trị tổng số bản ghi
        this.totalSelected = 0;
        //Nếu giá trị pageNumber lớn hơn 1 thì:
        if (this.pageNumber > 1) {
          //Hiện nút Prev
          this.btnPreNone = false;
        } else {
          //Ngược lại thì:
          //Ẩn nút Prev
          this.btnPreNone = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Theo dõi sự thay đổi giá trị của offSet
     * Author: DungNP (21/12/2022)
     */
    offSet() {
      try {
        //Nếu giá trị offSet + giá trị pageSize mà lớn hơn tổng số bản ghi thì:
        if (this.offSet + this.pageSize > this.totalRecord) {
          //Ẩn nút next
          this.btnNextNone = true;
        } else {
          //Hiện nút next
          this.btnNextNone = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    //Gọi Apu lấy toàn bộ dữ liệu
    this.getEmployees();
  },
  methods: {
    /**
     * Thực hiện đặt lại ofSet và Limit của Paging
     * Author: DungNP (22/12/2022)
     */
    onResetPaging() {
      try {
        //Đặt lại giá trị checkbox
        this.unCheckAllRow();
        //Đặt lại giá trị tổng số bản ghi
        this.totalSelected = 0;
        //Đặt lại giá trị pageNumber = 1
        this.pageNumber = 1;
        //Đặt lại giá trị offSet = 0
        this.offSet = 0;
        //Đặt lại giá trị trang bắt đầu = 1
        this.recordStart = 1;
        //Đặt lại giá trị trang cuối bằng giá trị offSet + giá trị pageSize
        this.recordEnd = this.offSet + this.pageSize;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện xoá nhiều bản ghi
     * Author: DungNP (21/12/2022)
     */
    onDeletes() {
      try {
        //Reset lại mảng EmployeeId
        this.employeeID = [];
        //Lấy nhưng row được chọn
        var el = this.$refs.checkbox;
        for (const item of el) {
          //Nếu là checked thì:
          if (item.attributes["checked"].value == "true") {
            //Push employeeID vào mảng cần xoá
            this.employeeID.push(item.attributes["dataobj"].value);
          }
          
        }
        //Đặt status delete
        this.statusDelete = false;
        //Hiển thị dialog cảnh báo xoá
        this.isShowWarning = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện checked row
     * Author: DungNP (21/12/2022)
     */
    onCheckedRow($event) {
      try {
        this.isCheckedAll = false;
        //Lấy phần tử cha của ô check box
        var el = $event.target.parentElement;
        //Nếu checked bằng false thì:
        if (el.attributes[1].value == "false") {
          //Thực hiện checked
          el.classList.value = el.classList.value + " checked";
          //Đặt trạng thái checked bằng true
          el.attributes[1].value = "true";
          //Tăng tổng số checked
          this.totalSelected++;
        } else {
          //Nếu checked bằng true thì:
          //Thực hiện unchecked
          el.classList.value = el.classList[0];
          //Đặt trạng thái checked bằng false
          el.attributes[1].value = "false";
          //Giản tổng số checked
          this.totalSelected--;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện check all tất cả row
     * Author: DungNP (21/12/2022)
     */
    checkAllRow() {
      try {
        //Lấy ra toàn bộ row
        var allrow = this.$refs.checkbox;
        //Checked ô check all
        this.$refs.checkboxall.classList.value =
          this.$refs.checkboxall.classList.value + " checked";
        //Đặt thuộc tính checked = true
        this.$refs.checkboxall.attributes[1].value = "true";
        //Checked toàn bộ row
        for (const item of allrow) {
          //Checked các ô trong từng row
          item.classList.value = item.classList.value + " checked";
          //Đặt thuộc tính checked = true
          item.attributes[1].value = "true";
          //Tăng tổng số checked
          this.totalSelected++;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Bỏ check toàn bộ row
     * Author: DungNP (21/12/2022)
     */
    unCheckAllRow() {
      try {
        //Lấy ra toàn bộ row
        var allrow = this.$refs.checkbox;
        //Bỏ checked ô check all
        this.$refs.checkboxall.classList.value =
          this.$refs.checkboxall.classList[0] +
          " " +
          this.$refs.checkboxall.classList[1];
        //Đặt thuộc tính checked = false
        this.$refs.checkboxall.attributes[1].value = "false";
        //Bỏ checked toàn bộ row
        for (const item of allrow) {
          //Unchecked các ô trong từng row
          item.classList.value = item.classList[0];
          //Đặt thuộc tính checked = false
          item.attributes[1].value = "false";
          //Giảm tổng số checked
          this.totalSelected--;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện check all rows
     * Author: DungNP (21/12/2022)
     */
    onCheckAllRow() {
      try {
        //Đặt lại tổng số checked

        //Nếu checkall không checked thì:
        if (this.$refs.checkboxall.attributes[1].value == "false") {
          this.totalSelected = 0;
          this.checkAllRow();
          this.isCheckedAll = true;
        }
        //Nếu checkall đang checked thì:
        else {
          this.unCheckAllRow();
          this.isCheckedAll = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện Active thi click vào chọn phân trang
     * Author: DungNP (21/12/2022)
     */
    onShowActive(e) {
      try {
        e.currentTarget.setAttribute("hidden", "false");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện lùi về trang trước
     * Authro: DungNP (21/12/2022)
     */
    prePage() {
      try {
        //Nếu pageNumber mà lớn hơn 1 thì:
        if (this.pageNumber > 1) {
          //Giảm pageNumber đi 1 đơn vị
          this.pageNumber--;
        }
        //Nếu giá trị offSet lớn hơn 0 thì:
        if (this.offSet > 0) {
          //Gán giá trị offSet bằng giá trị offSet hiện tại - giá trị pageSize
          this.offSet = this.offSet - this.pageSize;
          //Gán giá trị trang bắt đầu bằng giá gì offSet + 1
          this.recordStart = this.offSet + 1;
          //Gán giá trị trang cuối bằng giá trị trang bắt đầu - 1 + giá trị pageSize
          this.recordEnd = this.recordStart - 1 + this.pageSize;
        }
        //Nếu giá trị tìm kiếm là null thì:
        if (!this.employeeFilter) {
          //Gọi API lấy lại toàn bộ bản ghi
          this.getEmployees();
        } else {
          //Nếu giá trị tìm kiếm khác null thì:
          //Gọi API tìm kiếm
          this.onFilter();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện tiến về trang tiếp theo
     * Authro: DungNP (21/12/2022)
     */
    nextPage() {
      try {
        //Tăng pageNumber thêm 1 đơn vị
        this.pageNumber++;
        //Gán giá trị offSet bằng giá trị offSet hiện tại + giá trị pageSize
        this.offSet = this.offSet + this.pageSize;
        //Gán giá trị trang bắt đầu bằng giá trị offSet + 1
        this.recordStart = this.offSet + 1;
        //Gán giá trị trang cuối bằng giá trị trang bắt đầu - 1 + giá trị pageSize
        this.recordEnd = this.recordStart - 1 + this.pageSize;
        //Nếu giá trị trang cuối lớn hơn tổng số bản ghi thì:
        if (this.recordEnd > this.totalRecord) {
          //Gán giá trị trang cuối bằng tổng số bản ghi
          this.recordEnd = this.totalRecord;
        }
        //Nếu giá trị tìm kiếm là null thì:
        if (!this.employeeFilter) {
          //Gọi API lấy lại toàn bộ bản ghi
          this.getEmployees();
        } else {
          //Nếu giá trị tìm kiếm khác null thì:
          //Gọi API tìm kiếm
          this.onFilter();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Tạo event để hiển thị form chi tiết
     * @param {Any} dataemps dữ liệu nhân viên
     * Author: DungNP (19/12/2022)
     */
    onShowDetail(dataemps, status) {
      try {
        this.$emit("onAddFuncCopy", dataemps, status);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy giá trị PageSize
     * Author: DungNP (20/12/2022)
     */
    getPageSize(e) {
      try {
        //Remove class active của các item
        var el = document.getElementsByClassName("list-record__item");
        for (const item of el) {
          item.setAttribute("class", "list-record__item");
        }
        //Add class active cho item được click
        e.currentTarget.setAttribute("class", "list-record__item active");

        //Lấy giá trị pageSize
        var value = e.currentTarget.getAttribute("value");
        this.pageSize = parseInt(value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ẩn và hiển thị Contextmenu Paging
     * Author: DungNP (20/12/2022)
     */
    onShowPaging() {
      try {
        this.hideContextMenuPaging = !this.hideContextMenuPaging;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện lấy lại dữ liệu
     * Author: DungNP (21/12/2022)
     */
    refreshData() {
      try {
        //Đặt lại giá trị checkbox
        this.unCheckAllRow();
        //Đặt lại giá trị tổng số bản ghi
        this.totalSelected = 0;
        //Reset lại pageNumber = 1
        this.pageNumber = 1;
        //Reset lại offSet = 0
        this.offSet = 0;
        //Reset lại trang bắt đầu = 1
        this.recordStart = 1;
        //Đặt giá trị trang kết thúc bằng giá trị offSet + giá trị pageSize
        this.recordEnd = this.offSet + this.pageSize;
        //Ẩn nút lùi trang
        this.btnPreNone = true;
        //Hiển thị nút tiến trang
        this.btnNextNone = false;
        //Gọi hàm lấy lại dữ liệu
        this.getEmployees();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện tìm kiếm theo page hiện tại
     * Author: DungNP (21/12/2022)
     */
    onFilterPaging() {
      try {
        //Đặt lại giá trị checkbox
        this.unCheckAllRow();
        //Đặt lại giá trị tổng số bản ghi
        this.totalSelected = 0;
        //Reset lại pageNumber = 1
        this.pageNumber = 1;
        //Reset lại offSet = 0
        this.offSet = 0;
        //Reset lại trang bắt đầu = 1
        this.recordStart = 1;
        //Đặt giá trị trang kết thúc bằng giá trị offSet + giá trị pageSize
        this.recordEnd = this.offSet + this.pageSize;
        //Ẩn nút lùi trang
        this.btnPreNone = true;
        //Hiển thị nút tiến trang
        this.btnNextNone = false;
        //Gọi hàm lấy lại dữ liệu
        this.onFilter();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện load dữ liệu khi được khởi tạo
     * Author: DungNP (15/12/2022)
     */
    getEmployees() {
      try {
        //Reset lại ô tìm kiếm
        this.employeeFilter = "";
        //Hiển thị loading
        this.isShowLoading = true;

        //Load dữ liệu từ API
        this.axios
          .get(
             `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
            //`http://localhost:56263/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
          )
          .then((res) => {
            //Gán data trả về cho employees
            console.log(res);
            this.employees = res.data.Data;
            //Gán tổng bản ghi bằng tổng giá trị bản ghi trả về
            this.totalRecord = res.data.TotalRecord;
            //Nếu trang cuối lớn hơn tổng sổ bản ghi thì:
            if (this.recordEnd > this.totalRecord) {
              //Gán giá trị trang cuối bằng tổng số bản ghi
              this.recordEnd = this.totalRecord;
            }

            //Ẩn loading khi lấy dữ liệu xong
            this.isShowLoading = false;
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện format tiền tệ
     * @param {Any} salary truyền vào giá trị tiền lương
     * Author: DungNP (19/12/2022)
     */
    formatSalary(salary) {
      try {
        if (salary) {
          var parseSalary = parseInt(salary).toString();
          parseSalary = parseSalary.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          return parseSalary;
        }
      } catch (error) {
        console.log(error);
        return ``;
      }
    },

    /**
     * Thực hiện format ngày sinh
     * @param {Any} date
     * Author: DungNP (13/12/2022)
     */
    formatDate(date) {
      try {
        date = new Date(date);

        //Lấy ngày:
        var day = date.getDate();
        day = day < 10 ? `0${day}` : day;

        //Lấy tháng:
        var month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;

        //Lấy năm:
        var year = date.getFullYear();

        //Trả về định dạng ngày/tháng/năm
        return `${day}/${month}/${year}`;
      } catch (error) {
        console.log(error);
        return ``;
      }
    },

    /**
     * Thực hiện định dạng lại giới tính (0: Nam -- 1: Nữ -- 2: Khác)
     * @param {Any} gender
     * Author: DungNP (15/12/2022)
     */
    formatGender(gender) {
      try {
        var gdr = "";
        if (gender == 0) {
          gdr = "Nữ";
        }
        if (gender == 1) {
          gdr = "Nam";
        }
        if (gender == 2) {
          gdr = "Khác";
        }
        return gdr;
      } catch (error) {
        console.log(error);
        return ``;
      }
    },

    /**
     * Tạo sự kiện addFunction để hiển thị form chi tiết
     * @param {Any} item
     * Author: DungNP (15/12/2022)
     */
    onRowDblClick(item, status) {
      try {
        this.$emit("addFunction", item, status);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện gọi sự kiện onShowContextMenuTable của App.vue để hiển thị Context Menu table:
     * @param {Any} $event sự kiện click
     * @param {Any} item thông tin nhân viên
     * Author: DungNP (14/12/2022)
     */
    showContextMenu($event, item) {
      try {
        //Tìm vị trí positionX và positionY của sự kiện click chuột:
        const positionX = $event.pageX - $event.currentTarget.offsetLeft;
        const positionY = $event.pageY - $event.currentTarget.offsetTop;
        this.dataobj = item;

        //Truyền vị trí positionX, positionY, empId và  empCode lên components cha
        this.positionTop = positionY + 10 + "px";
        this.positionLeft = positionX - 13 + "px";
        this.isShowContext = !this.isShowContext;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Load lại data
     * Authro: DungNP (22/12/2022)
     */
    onLoadData() {
      this.getEmployees();
    },

    /**
     * Thực hiện hiển thị dialog Warning
     * Author: DungNP (14/12/2022)
     */
    onShowWarning(dataemp, status) {
      try {
        this.dataemp.empId = dataemp.EmployeeId;
        this.dataemp.empCode = dataemp.EmployeeCode;
        this.dataemp.empName = dataemp.EmployeeName;
        this.statusDelete = status;
        this.dataemp.check = false;
        this.isShowWarning = true;
        this.isShowContext = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện hiển thị dialog Warning
     * Author: DungNP (14/12/2022)
     */
    onHideWarning(check) {
      try {
        if (check == true) {
          //Đặt lại giá trị checkbox
          this.unCheckAllRow();
          //Đặt lại giá trị tổng số bản ghi
          this.totalSelected = 0;
          //Reset lại pageNumber = 1
          this.pageNumber = 1;
          //Reset lại offSet = 0
          this.offSet = 0;
          //Reset lại trang bắt đầu = 1
          this.recordStart = 1;
          //Đặt giá trị trang kết thúc bằng giá trị offSet + giá trị pageSize
          this.recordEnd = this.offSet + this.pageSize;
          //Hiển thị Toast
          this.isShowToast = true;
          //Sau 5 giây sẽ tắt Toast
          setTimeout(() => (this.isShowToast = false), 5000);
          this.getEmployees();
        }
        this.isShowWarning = false;
        this.getEmployees();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện tìm kiếm nhân viên theo mã nhân viên, tên nhân viên hoặc số điện thoại
     * @param {Any} employeeFilter giá trị tìm kiếm được nhập vào
     * Author: DungNP (16/12/2022)
     */
    onFilter() {
      try {
        //Hiển thị Loading
        this.isShowLoading = true;

        //Gọi api để thực hiện tìm kiếm
        if (!this.employeeFilter) {
          this.getEmployees();
        } else {
          this.axios
            .get(
               `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.employeeFilter}`
              //`http://localhost:56263/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&keyword=${this.employeeFilter}`
            )
            .then((res) => {
              //Ẩn Loading
              this.isShowLoading = false;

              //Gán lại data mới cho employees
              this.employees = res.data.Data;
              //Nếu data trả về null thì:
              if (!this.employees) {
                //Gán giá trị tổng = 0
                this.totalRecord = 0;
                //Gán bản ghi bắt đầu = 0
                this.recordStart = 0;
                //Gán bản ghi cuối = 0
                this.recordEnd = 0;
                //Ẩn nút next trang
                this.btnNextNone = true;
              } else {
                //Nếu data trả về không null thì:
                //Gán tổng bằng số data trả về
                this.totalRecord = res.data.TotalRecord;
                //Nếu trang cuối lớn hơn tổng số bản ghi thì:
                if (this.recordEnd > this.totalRecord) {
                  //Gán giá trị trang cuối bằng tổng số bản ghi
                  this.recordEnd = this.totalRecord;
                  //Ẩn nút next trang
                  this.btnNextNone = true;
                }
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      employees: [],
      isShowLoading: false,
      isShowToast: false,
      isShowContext: false,
      positionTop: "",
      positionLeft: "",
      dataobj: {},
      dataemp: {},
      isShowWarning: false,
      employeeFilter: "",
      totalRecord: "",
      hideContextMenuPaging: true,
      pageSize: 10,
      pageNumber: 1,
      offSet: 0,
      btnPreNone: true,
      btnNextNone: false,
      recordStart: 1,
      recordEnd: 10,
      isActivePaging: true,
      totalSelected: 0,
      isCheckedAll: false,
      hidebtndelete: true,
      employeeID: [],
      statusDelete: true,
      loadingData: false,
      cursor: "",
      action: 0,
    };
  },
};
</script>

<style scoped>
#btnedit {
  width: 36px;
  height: 36px;
  text-align: center;
}
#btnFunc {
  width: 36px;
  height: 36px;
}
.btnPreNone {
  background-image: url(/src/assets/img/Sprites.64af8f61.svg);
  background-repeat: no-repeat;
  background-position: -33px -361px;
  background-color: transparent;
  transform: rotate(0deg);
  pointer-events: none;
  cursor: no-drop;
}

.btnNextNone {
  background-image: url(/src/assets/img/Sprites.64af8f61.svg);
  background-repeat: no-repeat;
  background-position: -33px -361px;
  background-color: transparent;
  transform: rotate(180deg);
  pointer-events: none;
  cursor: no-drop;
}
.list-record__item .record__icon {
  display: none;
}

.active > .record__icon {
  display: block;
}

.checked > .column-checkbox__icon {
  display: block;
}
.btn-delete {
  text-align: center;
}
.toolbar-left {
  width: calc(100% - 336px);
}
.hidebtndelete {
  display: none;
}
</style>
