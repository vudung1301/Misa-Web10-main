<template>
  <div>
  <div id="dlgEmployeeDetail" class="dialog" @click="onHideContext">
    <div class="dialog-wrapper">
      <div class="dialog__body">
        <div class="body-header">
          <div class="body-header__title">
            <span>{{ title }}</span>
          </div>
          <div
            @click="hideDetail"
            class="body-header__btn btn-close"
            id="btn-close"
          ></div>
          <span class="tooltip"
            >Đóng (ESC)
            <div class="tooltip-top"></div>
          </span>
        </div>
        <div class="dialog__content-info">
          <div class="info-left">
            <div class="info-left__id-name">
              <div class="info-item info__id">
                <div title="Mã nhân viên" class="info-lable">
                  Mã <b style="color: red"> *</b>
                </div>
                <input
                  ref="requiredempid"
                  @blur="
                    validateDataBlur(
                      this.employee.EmployeeCode,
                      this.$refs.requiredempid.id
                    )
                  "
                  v-bind:class="{ borderRed: this.requiredEmployeeCode }"
                  aria-label="Mã nhân viên"
                  tabindex="1"
                  class="input required"
                  type="text"
                  id="txtEmployeeCode"
                  :title="this.titleEmpCode"
                  v-model="this.employee.EmployeeCode"
                />
              </div>
              <div class="info-item info__name">
                <div title="Tên nhân viên" class="info-lable">
                  Tên <b style="color: red"> *</b>
                </div>
                <input
                  ref="requiredempname"
                  @blur="
                    validateDataBlur(
                      this.employee.EmployeeName,
                      this.$refs.requiredempname.id
                    )
                  "
                  v-bind:class="{ borderRed: this.requiredEmployeeName }"
                  aria-label="Tên nhân viên"
                  tabindex="2"
                  class="input full-input required"
                  id="txtEmployeeName"
                  type="text"
                  v-model="this.employee.EmployeeName"
                  :title="this.titleEmpName"
                />
              </div>
            </div>
            <div class="info-item info__department">
              <div title="Đơn vị" class="info-lable">
                Đơn vị <b style="color: red"> *</b>
              </div>
              <div class="paging-right__combobox">
                <input
                  ref="requiredempDepartment"
                  @blur="
                    validateDataBlur(
                      this.$refs.requiredempDepartment.datadepmid,
                      this.$refs.requiredempDepartment.id
                    )
                  "
                  v-bind:class="{ borderRed: this.requiredDepartment }"
                  readonly
                  @click.stop="onShowDepartment"
                  :datadepmid="this.departmentId"
                  v-model="this.departmentName"
                  aria-label="Đơn vị"
                  tabindex="3"
                  class="input full-input required"
                  id="cbbDepartment"
                  type="text"
                  placeholder="- Chọn giá trị -"
                  :title="this.titleDepartment"
                />
                <div class="combobox" @click.stop="onShowDepartment">
                  <div class="combobox-icon"></div>
                </div>
                <ContextMenuDepartment
                  :datadepmname="this.departmentName"
                  @onAddClickSelected="onShowDepartmentName"
                  v-if="isShowDepartment"
                ></ContextMenuDepartment>
              </div>
            </div>
            <div class="info-item info__position">
              <div title="Chức danh" class="info-lable">
                Chức danh
                <b style="color: red"> *</b>
              </div>
              <div class="paging-right__combobox">
                <input
                  ref="requiredempPosition"
                  @blur="
                    validateDataBlur(
                      this.$refs.requiredempPosition.datapostionid,
                      this.$refs.requiredempPosition.id
                    )
                  "
                  v-bind:class="{ borderRed: this.requiredPosition }"
                  readonly
                  :datadepmid="this.positionId"
                  v-model="this.positionName"
                  @click.stop="onShowPosition"
                  aria-label="Đơn vị"
                  tabindex="3"
                  class="input full-input required"
                  type="text"
                  placeholder="- Chọn giá trị -"
                  id="cbbPosition"
                  :title="this.titlePosition"
                />
                <div class="combobox" @click.stop="onShowPosition">
                  <div class="combobox-icon"></div>
                </div>
                <ContextMenuPosition
                  :datapositionname="this.positionName"
                  @onAddClickSelected="onShowPositionName"
                  v-if="isShowPosition"
                ></ContextMenuPosition>
              </div>
            </div>
          </div>
          <div class="info-right">
            <div class="info-right_row">
              <div class="info-item info__birthday">
                <div title="Ngày sinh" class="info-lable">Ngày sinh</div>
                <input
                  ref="requiredempDateOfBirth"
                  @blur="
                    validateDataBlur(
                      this.employee.DateOfBirth,
                      this.$refs.requiredempDateOfBirth.id
                    )
                  "
                  v-bind:class="{ borderRed: this.requiredempDateOfBirth }"
                  id="birthday"
                  tabindex="5"
                  class="input full-input"
                  type="date"
                  v-model="this.employee.DateOfBirth"
                  :title="this.titleBirthday"
                />
              </div>
              <div class="info-item info__gender">
                <div title="Giới tính" class="info-lable">Giới tính</div>
                <div class="gender-item-container">
                  <div class="gender-item">
                    <label
                      tabindex="6"
                      ref="inputmale"
                      @keydown.enter="onChecked(this.$refs.inputmale.id)"
                      id="male"
                    >
                      <input
                        @click="getGenderChecked"
                        id="male"
                        type="radio"
                        name="gender"
                        value="1"
                        :checked="this.checkedValueMale"
                      />Nam
                      <div class="radio__icon"></div>
                    </label>
                  </div>
                  <div class="gender-item">
                    <label
                      tabindex="7"
                      ref="inputfemale"
                      @keydown.enter="onChecked(this.$refs.inputfemale.id)"
                      id="female"
                    >
                      <input
                        @click="getGenderChecked"
                        id="female"
                        type="radio"
                        name="gender"
                        value="0"
                        :checked="this.checkedValueFemale"
                      />Nữ
                      <div class="radio__icon"></div>
                    </label>
                  </div>
                  <div class="gender-item">
                    <label
                      tabindex="8"
                      ref="inputother"
                      @keydown.enter="onChecked(this.$refs.inputother.id)"
                      id="other"
                    >
                      <input
                        @click="getGenderChecked"
                        id="other"
                        type="radio"
                        name="gender"
                        value="2"
                        :checked="this.checkedValueOther"
                      />Khác
                      <div class="radio__icon"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="info-right_row">
              <div class="info-item info__identity-number">
                <div title="SỐ chứng minh nhân dân" class="info-lable">
                  Số CMND
                </div>
                <input
                  v-model="this.employee.IdentityNumber"
                  tabindex="9"
                  class="input full-input"
                  type="text"
                />
              </div>
              <div class="info-item info__identity-issue-date">
                <div title="Ngày cấp" class="info-lable">Ngày cấp</div>
                <input
                  ref="requiredempIdentityDate"
                  @blur="
                    validateDataBlur(
                      this.employee.IdentityIssueDate,
                      this.$refs.requiredempIdentityDate.id
                    )
                  "
                  v-bind:class="{ borderRed: this.requiredempIdentityDate }"
                  id="identityDate"
                  v-model="this.employee.IdentityIssueDate"
                  tabindex="10"
                  class="input full-input"
                  type="date"
                  :title="this.titleIdentityDate"
                />
              </div>
            </div>
            <div class="info-item info__identity-issue-date-place">
              <div title="Nơi cấp" class="info-lable">Nơi cấp</div>
              <input
                v-model="this.employee.IdentityIssuePlace"
                tabindex="11"
                class="input full-input"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="dialog__content-info-more">
          <div class="info-item info__address">
            <div title="Địa chỉ" class="info-lable">Đia chỉ</div>
            <input
              v-model="this.employee.Address"
              tabindex="12"
              class="input full-input"
              type="text"
            />
          </div>
          <div class="info-item__more info-item">
            <div class="info-more_container">
              <div class="info-item info__phone">
                <div title="Điện thoại di động" class="info-lable">
                  ĐT di động
                </div>
                <input
                  @blur="this.validatePhoneNumber(this.employee.PhoneNumber)"
                  v-bind:class="{ borderRed: this.requiredempPhoneNumber }"
                  @keypress="isNumberKey"
                  tabindex="13"
                  class="input full-input"
                  type="text"
                  v-model="this.employee.PhoneNumber"
                  :title="this.titlePhoneNumber"
                />
              </div>
              <div class="info-item info__back-number">
                <div title="Tài khoản ngân hàng" class="info-lable">
                  Tài khoản ngân hàng
                </div>
                <input
                  v-model="this.employee.BankAccountNumber"
                  tabindex="16"
                  class="input full-input"
                  type="text"
                />
              </div>
            </div>
            <div class="info-more_container">
              <div class="info-item info__fax">
                <div title="Điện thoại cố định" class="info-lable">
                  ĐT cố định
                </div>
                <input
                  v-on:keypress="isNumberKey($event)"
                  v-model="this.employee.TelephoneNumber"
                  tabindex="14"
                  class="input full-input"
                  type="text"
                />
              </div>
              <div class="info-item info__bank-name">
                <div title="Tên ngày hàng" class="info-lable">
                  Tên ngân hàng
                </div>
                <input
                  v-model="this.employee.BankName"
                  tabindex="17"
                  class="input full-input"
                  type="text"
                />
              </div>
            </div>
            <div class="info-more_container">
              <div class="info-item info__email">
                <div title="Email" class="info-lable">Email</div>
                <input
                  @blur="validateEmail(this.employee.Email)"
                  v-bind:class="{ borderRed: this.requiredempEmail }"
                  v-model="this.employee.Email"
                  tabindex="15"
                  class="input full-input"
                  type="text"
                  :title="this.titleEmail"
                />
              </div>
              <div class="info-item info__bank-address">
                <div title="Chi nhánh" class="info-lable">Chi nhánh</div>
                <input
                  v-model="this.employee.BankBranchName"
                  tabindex="18"
                  class="input full-input"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog__footer">
        <div class="dialong__footer-left">
          <button
            @click="hideDetail"
            tabindex="21"
            class="btn btn-outline"
            id="btn-cancel"
            @blur="autoFocus"
          >
            Huỷ
          </button>
          <span class="tooltip"
            >Huỷ bỏ
            <div class="tooltip-bottom"></div>
          </span>
        </div>
        <div class="dialong__footer-right">
          <button
            v-bind:class="{ btnAgree }"
            @click="employeeDetails(false)"
            tabindex="19"
            class="btn btn-outline"
            id="btn-save"
          >
            Cất
          </button>
          <span class="tooltip button-save"
            >Cất (Ctrl + S)
            <div class="tooltip-bottom"></div>
          </span>
          <button
            v-bind:class="{ hideBtn: this.hideBtnSaveAdd }"
            @click="employeeDetails(true)"
            tabindex="20"
            class="btn btn-add"
            id="btn-save-add"
          >
            Cất và Thêm
          </button>
          <span class="tooltip btn-save-add"
            >Cất và thêm (Ctrl + Shift + S)
            <div class="tooltip-bottom"></div>
          </span>
        </div>
      </div>
    </div>
  </div>
  <MISAWarning
    @onAddClickSave="onHideAndSave"
    @onAddClickNo="onHideWarningNo"
    @onAddClick="onHideWarning"
    :errorMsg="this.errorMsg"
    :hidebtn="this.hideBtn"
    :checkChangeData="this.checkChangeData"
    v-if="isShowWaring"
  ></MISAWarning>

</div>
</template>

<script>
import ContextMenuDepartment from "../base/ContextMenuDepartment.vue";
import ContextMenuPosition from "../base/ContextMenuPosition.vue";
import MISAWarning from "../base/MISAWarning.vue";
import { EmployeeService } from "@/js/service";

export default {
  name: "EmployeeDetail",
  components: { ContextMenuDepartment, ContextMenuPosition, MISAWarning },
  props: ["statusEmp", "emp"],
  emits: ["onHideNo", "onAddClick", "onClickDetail", "onAddLoading"],
  watch: {
    /**
     * Theo dõi sự thay đổi giá trị của departmentName
     * Author: DungNP (17/12/2022)
     */
    departmentName() {
      if (this.departmentId == "- Chọn giá trị -") {
        this.requiredDepartment = false;
      } else {
        if (!this.departmentName) {
          this.requiredDepartment = true;
        } else {
          this.requiredDepartment = false;
        }
      }
    },

    /**
     * Theo dõi sự thay đổi giá trị của positionName
     * Author: DungNP (17/12/2022)
     */
    positionName() {
      if (this.positionId == "- Chọn giá trị -") {
        this.requiredPosition = false;
      } else {
        if (!this.positionName) {
          this.requiredPosition = true;
        } else {
          this.requiredPosition = false;
        }
      }
    },

    /**
     * Theo dõi sự thay đổi của data
     * Author: DungNP (19/12/2022)
     */
    employee: {
      handler: function (newval, oldd) {
        if (newval == oldd) {
          this.checkChangeData = true;
        } else {
          this.checkChangeData = false;
        }
      },
      deep: true,
    },
  },
  created() {
    /**
     * Khởi tạo mã nhân viên mới
     * Author: DungNP (15/12/2022)
     */
    if (this.statusEmp == "newEmployee") {
      //Đổi lại title
      this.title = "Thêm mới thông tin nhân viên";
      //Gán giá trị giới tính mặc đinh làm Nam (1)
      this.employee.Gender = "1";
      //Gọi AIP lấy mã nhân viên mới
      this.getEmployeeCode();
    } else if (this.statusEmp == "copyEmployee") {
      //Đổi lại title
      this.title = "Thêm mới thông tin nhân viên";
      //Binding dữ liệu lên form chi tiết
      this.onBindingData(this.emp);
      //Gọi AIP lấy mã nhân viên mới
      this.getEmployeeCode();
    } else {
      //Đổi lại title là Sửa thông tin nhân viên
      this.title = "Sửa thông tin nhân viên";
      //Ẩn nút cất và thêm
      this.hideBtnSaveAdd = true;
      //Style lại nút cất
      this.btnAgree = true;
      //Binding dữ liệu lên form chi tiết
      this.onBindingData(this.emp);
    }

    //Focus vào ô nhập liệu đầu tiên
    this.autoFocus();
    this.isCheckHide = this.statusHide;
  },
  beforeUnmount() {
    this.onAddFuncLoading();
  },
  methods: {
    /**
     * Tạo evnet loading khi tắt form chi tiết
     * Author: DungNP (19/12/2022)
     */
    onAddFuncLoading() {
      this.$emit("onAddLoading");
    },
    /**
     * Thực hiện binding dữ liệu khi sửa thông tin nhân viên
     * @param {Any} data Truyền vào dự liệu nhân viên
     * Author: DungNP (19/12/2022)
     */
    onBindingData(data) {
      try {
        //Binding data
        this.employee = data;
        //Binding ngày sinh
        this.employee.DateOfBirth = this.onConvertDate(data.DateOfBirth);
        //Binding ngày cấp
        this.employee.IdentityDate = this.onConvertDate(data.IdentityDate);
        //Binding đơn vị
        this.departmentId = this.employee.DepartmentId;
        this.departmentName = this.employee.DepartmentName;
        //Binding chức danh
       
        this.positionId = this.employee.PositionId;
        this.positionName = this.employee.PositionName;
        
        //Binding giới tính
        if (this.employee.Gender == 0) {
          this.checkedValueMale = false;
          this.checkedValueFemale = true;
          this.checkedValueOther = false;
        } else if (this.employee.Gender == 2) {
          this.checkedValueMale = false;
          this.checkedValueFemale = false;
          this.checkedValueOther = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện convert ngày tháng năm để binding lên form
     * @param {Any} date Dữ liệu ngày tháng
     * Author: DungNP (19/12/2022)
     */
    onConvertDate(date) {
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

        //Trả về định dạng tháng/năm/ngày
        var data =
          `${day}/${month}/${year}` == "01/01/1970" ||
          `${day}/${month}/${year}` == "NaN/NaN/NaN"
            ? ""
            : `${year}-${month}-${day}`;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện ấn Enter để chọn giới tính
     * Author: DungNP (17/12/2022)
     */
    onChecked(ref) {
      try {
        if (ref == "male") {
          this.checkedValueMale = true;
          this.checkedValueFemale = false;
          this.checkedValueOther = false;
          this.employee.Gender = 1;
        } else if (ref == "female") {
          this.checkedValueMale = false;
          this.checkedValueFemale = true;
          this.checkedValueOther = false;
          this.employee.Gender = 0;
        } else if (ref == "other") {
          this.checkedValueMale = false;
          this.checkedValueFemale = false;
          this.checkedValueOther = true;
          this.employee.Gender = 2;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện focus vào ô nhập liệu đầu tiên khi form được mở lên
     * Author: DungNP (17/12/2022)
     */
    autoFocus() {
      // this.$refs.requiredempid.focus();
      this.$nextTick(() => this.$refs.requiredempid.focus());
    },

    onHideWarningNo() {
      this.$emit("onHideNo");
    },

    /**
     * Ẩn dialong Warning
     * Author: DungNP (17/12/2022)
     */
    onHideWarning() {
      try {
        //Kiểm tra xem ô nào  bị lỗi đầu tiên sau đó sẽ focus vào
        this.onCheckFocus();
        if (
          this.errorMsg[0] == "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
        ) {
          this.employeeDetails(false);
        }

        //Ẩn dialog Warning
        this.isShowWaring = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra ô nhập liệu lỗi đầu tiên và focus vào ô đó
     * Author: DungNP (19/12/2022)
     */
    onCheckFocus() {
      try {
        //Kiểm tra xem ô nào  bị lỗi đầu tiên sau đó sẽ focus vào
        if (
          this.$refs.requiredempid.getAttribute("class").indexOf("borderRed") !=
          -1
        ) {
          this.autoFocus();
        } else if (
          this.$refs.requiredempname
            .getAttribute("class")
            .indexOf("borderRed") != -1
        ) {
          this.$nextTick(() => this.$refs.requiredempname.focus());
        } else if (
          this.$refs.requiredempDepartment
            .getAttribute("class")
            .indexOf("borderRed") != -1
        ) {
          this.$nextTick(() => this.$refs.requiredempDepartment.focus());
          this.onShowDepartment();
        } else if (
          this.$refs.requiredempPosition
            .getAttribute("class")
            .indexOf("borderRed") != -1
        ) {
          this.$nextTick(() => this.$refs.requiredempPosition.focus());
          this.onShowPosition();
        } else if (
          this.$refs.requiredempDateOfBirth
            .getAttribute("class")
            .indexOf("borderRed") != -1
        ) {
          this.$nextTick(() => this.$refs.requiredempDateOfBirth.focus());
        } else if (
          this.$refs.requiredempIdentityDate
            .getAttribute("class")
            .indexOf("borderRed") != -1
        ) {
          this.$nextTick(() => this.$refs.requiredempIdentityDate.focus());
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Validate trường mã nhân viên
     * Author: DungNP (17/12/2022)
     */
    validateEmpCode() {
      try {
        if (!this.employee.EmployeeCode) {
          //Nếu null thì push lỗi vào mảng
          this.errorMsg.push("Mã nhân viên không được phép để trống.");
          //Hiển thị borderRed
          this.requiredEmployeeCode = true;
          //Gán title theo lỗi
          this.titleEmpCode = "Mã nhân viên không được phép để trống";
        } else {
          //Nếu không trống kiểm tra định dạng mã nhân viên (Mã nhân viên phải kết thúc bằng chữ số)
          const last = parseInt(this.employee.EmployeeCode.slice(-1));
          if (Number.isInteger(last)) {
            //Ẩn borderRed
            this.requiredEmployeeCode = false;
            //Gán title theo lỗi
            this.titleEmpCode = "";
          } else {
            //Nếu sai thì push lỗi vào mảng
            this.errorMsg.push("Mã nhân viên phải kết thúc bằng chữ số.");
            //Hiển thị borderRed
            this.requiredEmployeeCode = true;
            //Gán title theo lỗi
            this.titleEmpCode = "Mã nhân viên phải kết thúc bằng chữ số";
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Validate trường mã tên nhân viên
     * Author: DungNP (17/12/2022)
     */
    validateEmpName() {
      try {
        if (!this.employee.EmployeeName) {
          //Nếu null thì push lỗi vào mảng
          this.errorMsg.push("Tên nhân viên không được phép để trống.");
          //Hiển thị borderRed
          this.requiredEmployeeName = true;
          //Gán title theo lỗi
          this.titleEmpName = "Tên nhân viên không được phép để trống";
        } else {
          //Ẩn borderRed
          this.requiredEmployeeName = false;
          //Gán title theo lỗi
          this.titleEmpName = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện kiểm tra từng trường dữ liệu
     * Author: DungNP (17/12/2022)
     */
    validateData() {
      this.errorMsg = [];
      //Kiểm tra trường mã nhân viên
      this.validateEmpCode();

      //Kiểm tra trường tên nhân viên
      this.validateEmpName();

      //Kiểm tra trường ngày sinh
      // this.validateBirthday(this.employee.DateOfBirth);

      //Kiểm tra trường ngày cấp
      // this.validateIdentityDate(this.employee.IdentityDate);

      //Kiểm tra trường đơn vị
      this.validateDepartment();

      //Kiểm tra trường chức danh
      this.validatePosition();

      //Kiểm tra trường email
      if (this.employee.Email) {
        this.validateEmail(this.employee.Email);
      }

      //Kiểm tra trường số điện thoại
      if (this.employee.PhoneNumber) {
        this.validatePhoneNumber(this.employee.PhoneNumber);
      }
    },

    /**
     * Thực hiện lưu dữ liệu và đóng form chi tiết
     * Author: DungNP (19/12/2022)
     */
    onHideAndSave() {
      try {
        this.isShowWaring = false;
        this.validateData();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thêm mới một nhân viên vào CSDL - Hoặc sửa thông tin nhân viên và lưu vào CSDL
     * @param {Any} check truyền vào tham số check. Nếu check = true thì thực hiện Cất và thêm nếu check = false thì thực hiện Cất
     * Author: DungNP (15/12/2022)
     */
    employeeDetails(check) {
      try {
        //Ẩn nút huỷ change
        //Validate từng trường dữ liệu
        this.validateData();
        if (this.errorMsg.length > 0) {
          //Hiển thị thông báo lỗi validate dữ liệu
          this.isShowWaring = true;
          this.hideBtn = true;
        } else {
          //Build đối tượng
          this.employee.DepartmentId = this.departmentId;
          this.employee.PositionId = this.positionId;
          this.employee.CreatedBy =
            Math.floor(Math.random() * (999999999 - 0)) + 0;

          //Kiểm tra nếu statusEmp = newEmployee thì thực hiện gọi API thêm mới, ngược lại sẽ gọi API sửa
          if (
            this.statusEmp == "newEmployee" ||
            this.statusEmp == "copyEmployee"
          ) {
            //Gọi api để thêm mới
            this.axios
              .post("https://amis.manhnv.net/api/v1/Employees", this.employee)
              .then(() => {
                //Kiểm tra xem là Cất hay Cất và thêm
                if (check == false) {
                  //Gọi lên event cha để ẩn dialog và hiển thị Toast
                  this.$emit("onAddClick", this.statusEmp, check);
                } else {
                  //Gọi lên event cha để hiển thị Tost
                  this.$emit("onAddClick", this.statusEmp, check);

                  //Reset lại các ô nhập liệu và không đóng form
                  this.employee = {};
                  this.departmentId = "- Chọn giá trị -";
                  this.departmentName = "";
                  this.positionId = "- Chọn giá trị -";
                  this.positionName = "";

                  //Gọi Api lấy mã nhân viên mới
                  this.getEmployeeCode();
                }
              })
              .catch((res) => {
                //Hiển thị borderRed
                this.requiredEmployeeCode = true;
                //Cập nhật title
                this.titleEmpCode = "Mã nhân viên đã tồn tại trong hệ thống";
                //Hiển thị thông báo lỗi validate dữ liệu
                this.isShowWaring = true;
                //Cập nhật lại lỗi
                this.errorMsg.push(res.response.data.userMsg);
                this.hideBtn = true;
              });
          } else {
            //Gọi api sửa
            this.axios
              .put(
                "https://amis.manhnv.net/api/v1/Employees/" +
                  this.employee.EmployeeId,
                this.employee
              )
              .then(() => {
                //Gọi lên event cha để ẩn dialog
                this.$emit("onAddClick", this.statusEmp);
              })
              .catch((res) => {
                //Hiển thị thông báo lỗi
                this.errorMsg = [];
                this.errorMsg.push(
                  "Mã nhân viên đã tồn tại trong hệ thống. Vui lòng kiểm tra lại."
                );
                this.requiredEmployeeCode = true;
                this.isShowWaring = true;

                console.log(res);
              });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy thông tin mã nhân viên mới
     * Author: DungNP (17/12/2022)
     */
     async  getEmployeeCode() {
      try {
      //Gọi API lấy mã nhân viên mới
        const employeeService = new EmployeeService();
        const res = await employeeService.getNewEmployeeCode();
        
        this.employee.EmployeeCode = res;
        
      //   this.axios
      //     .get("https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
      //     .then((res) => {
      //       this.employee.EmployeeCode = res.data;
      //     })
      //     .catch();
      }
       catch (error) {
        console.log(error);
      }
    },

    /**
     * Tạo sự kiện onClickDetail
     * Author: DungNP (15/12/2022)
     */
    hideDetail() {
      try {
        //Nếu dữ liệu đã thay đổi
        if (this.checkChangeData == true) {
          this.validateData();
          this.errorMsg = [];
          this.errorMsg.push("Dữ liệu đã bị thay đổi. Bạn có muốn cất không?");
          this.isShowWaring = true;
        } else {
          this.$emit("onClickDetail");
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị Position
     * Author: DungNP (16/12/2022)
     */
    onShowPosition() {
      try {
        //Ẩn Context Department
        this.isShowDepartment = false;
        //Ẩn hoặc hiện Context Position
        this.isShowPosition = !this.isShowPosition;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị Department
     * Author: DungNP (16/12/2022)
     */
    onShowDepartment() {
      try {
        //Ẩn Context Position
        this.isShowPosition = false;
        //Ẩn hoặc hiện Context Department
        this.isShowDepartment = !this.isShowDepartment;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị DepartmentName vào textbox
     * Author: DungNP (16/12/2022)
     */
    onShowDepartmentName(item) {
      try {
        //Lấy giá trị item được gửi lên và gán vào data
        this.departmentId = item.DepartmentId;
        if (!item.DepartmentName) {
          this.departmentName = "";
        } else {
          this.departmentName = item.DepartmentName;
        }

        //Ẩn contextMenuDepartment
        this.isShowDepartment = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị PositionName vào textbox
     * Author: DungNP (16/12/2022)
     */
    onShowPositionName(item) {
      try {
        //Lấy giá trị item được gửi lên và gán vào data
        this.positionId = item.PositionId;
        if (!item.PositionName) {
          this.positionName = "";
        } else {
          this.positionName = item.PositionName;
        }
        //Ẩn contextMenuDepartment
        this.isShowPosition = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ẩn ContextDepartment và ContextPosition
     * Author: DungNP (16/12/2022)
     */
    onHideContext() {
      try {
        this.isShowDepartment = false;
        this.isShowPosition = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy giá trị giới tính đang được checked
     * Author: DungNP (17/12/2022)
     */
    getGenderChecked(e) {
      try {
        this.employee.Gender = e.currentTarget.getAttribute("value");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện validate dữ liệu
     * @param {Any} data Truyền vào dữ liệu trên form
     * @param {Any} ref Truyền vào dữ liệu refs
     * Author: DungNP (17/12/2022)
     */
    validateDataBlur(data, ref) {
      try {
        //Validate trường Mã nhân viên
        if (ref == "txtEmployeeCode") {
          this.validateEmpCode();
        }

        //Validate trường Tên nhân viên
        if (ref == "txtEmployeeName") {
          this.validateEmpName();
        }

        // //Validate trường ngày sinh
        // if (ref == "birthday") {
        //   this.validateBirthday(data);
        // }

        //Validate trường ngày cấp
        // if (ref == "identityDate") {
        //   this.validateIdentityDate(data);
        // }

        //Validate trường đơn vị
        if (ref == "cbbDepartment") {
          this.validateDepartment();
        }

        //Validate trường chức danh
        if (ref == "cbbPosition") {
          this.validatePosition();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện kiểm tra số điện thoại
     * @param {Any} data Truyền vào dữ liệu số điện thoại
     * Author: DungNP (18/12/2022)
     */
    validatePhoneNumber(data) {
      try {
        if (data) {
          var regexIN = /[0-9]{10}/;
          if (!regexIN.test(this.employee.PhoneNumber)) {
            this.requiredempPhoneNumber = true;
            this.titlePhoneNumber = "Số điện thoại phải là 1 dãy 10 chữ số";
            this.errorMsg.push("Số điện thoại phải là 1 dãy 10 chữ số.");
          } else {
            this.requiredempPhoneNumber = false;
            this.titlePhoneNumber = "";
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện kiểm tra ngày sinh xem có hợp lệ không
     * @param {Any} data Truyền vào dữ liệu ngày sinh
     * @param {Any} ref Truyền vào dữ liệu refs
     * Author: DungNP (17/12/2022)
     */
    // validateBirthday(data) {
    //   try {
    //     if (!data) {
    //       //Dữ liệu ngày tháng sai
    //       this.requiredempDateOfBirth = true;
    //       this.titleBirthday = "Ngày sinh không hợp lệ";
    //       this.errorMsg.push("Ngày sinh không hợp lệ.");
    //     } else {
    //       let date = new Date(data);
    //       let datenow = new Date();
    //       if (date < datenow) {
    //         //Dữ liệu ngày tháng đúng
    //         this.requiredempDateOfBirth = false;
    //         this.titleBirthday = "";
    //       } else {
    //         //Dữ liệu ngày tháng sai
    //         this.requiredempDateOfBirth = true;
    //         this.titleBirthday = "Ngày sinh không thể lớn hơn ngày hiện tại";
    //         this.errorMsg.push("Ngày sinh không thể lớn hơn ngày hiện tại.");
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    /**
     * Thực hiện kiểm tra ngày cấp xem có hợp lệ không
     * @param {Any} data Truyền vào dữ liệu ngày cấp
     * @param {Any} ref Truyền vào dữ liệu refs
     * Author: DungNP (17/12/2022)
     */
    // validateIdentityDate(data) {
    //   try {
    //     if (!data) {
    //       //Dữ liệu ngày tháng sai
    //       this.requiredempIdentityDate = true;
    //       this.titleIdentityDate = "Ngày cấp không hợp lệ";
    //       this.errorMsg.push("Ngày cấp không hợp lệ.");
    //     } else {
    //       let date = new Date(data);
    //       let datenow = new Date();
    //       if (date < datenow) {
    //         //Dữ liệu ngày tháng đúng
    //         this.requiredempIdentityDate = false;
    //         this.titleIdentityDate = "";
    //       } else {
    //         //Dữ liệu ngày tháng sai
    //         this.requiredempIdentityDate = true;
    //         this.titleIdentityDate = "Ngày cấp không thể lớn hơn ngày hiện tại";
    //         this.errorMsg.push("Ngày cấp không thể lớn hơn ngày hiện tại.");
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    /**
     * Thực hiện validate Đơn vị
     * @param {Any} ref Truyền vào dữ liệu refs
     * Author: DungNP (17/12/2022)
     */
    validateDepartment() {
      try {
        if (!this.departmentName) {
          this.requiredDepartment = true;
          this.titleDepartment = "Đơn vị không được phép để trống";
          this.errorMsg.push("Đơn vị không được phép để trống.");
        } else {
          this.requiredDepartment = false;
          this.titleDepartment = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện validate Chức danh
     * @param {Any} ref Truyền vào dữ liệu refs
     * Author: DungNP (17/12/2022)
     */
    validatePosition() {
      try {
        if (!this.positionName) {
          this.requiredPosition = true;
          this.titlePosition = "Chức danh không được phép để trống";
          this.errorMsg.push("Chức danh không được phép để trống.");
        } else {
          this.requiredPosition = false;
          this.titleDepartment = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện chỉ cho phép nhập số
     * Author: DungNP (17/12/2022)
     */
    isNumberKey($event) {
      try {
        let keyCode = $event.keyCode ? $event.keyCode : $event.which;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
          $event.preventDefault();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Validate Email đúng định dạng
     * @param {Any} email Truyền vào dữ liệu email
     * Author: DungNP (17/12/2022)
     */
    validateEmail(email) {
      try {
        if (email) {
          var re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(email) == true) {
            this.requiredempEmail = false;
            this.titleEmail = "";
          } else {
            this.requiredempEmail = true;
            this.titleEmail = "Email không đúng định dạng";
            this.errorMsg.push("Email không đúng định dạng.");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      isShowDepartment: false,
      isShowPosition: false,
      departmentId: "",
      departmentName: "",
      positionId: "",
      positionName: "",
      title: "",
      titleBirthday: "",
      titleIdentityDate: "",
      titleEmail: "",
      titleEmpCode: "",
      titleEmpName: "",
      titleDepartment: "",
      titlePosition: "",
      titlePhoneNumber: "",
      borderRed: false,
      requiredEmployeeCode: false,
      requiredEmployeeName: false,
      requiredDepartment: false,
      requiredPosition: false,
      requiredempDateOfBirth: false,
      requiredempIdentityDate: false,
      requiredempPhoneNumber: false,
      requiredempEmail: false,
      isShowWaring: false,
      hideBtn: false,
      btnAgree: false,
      hideBtnSaveAdd: false,
      checkedValueMale: true,
      checkedValueFemale: false,
      checkedValueOther: false,
      checkChangeData: false,
      employee: {},
      errorMsg: [],
    };
  },
};
</script>

<style scoped>
.btnAgree {
  background-color: #304293;
  color: #fff;
}
.btnAgree:hover {
  background-color: #3c48b8;
}
</style>
