(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./Resources/assets/js/api/role.js":
/*!*****************************************!*\
  !*** ./Resources/assets/js/api/role.js ***!
  \*****************************************/
/*! exports provided: getRoutes, getRoleList, getAllPermissions, getRoles, getRole, addRole, updateRole, deleteRole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoutes", function() { return getRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoleList", function() { return getRoleList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPermissions", function() { return getAllPermissions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoles", function() { return getRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRole", function() { return getRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addRole", function() { return addRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateRole", function() { return updateRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteRole", function() { return deleteRole; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./Resources/assets/js/utils/request.js");

function getRoutes() {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/vue-element-admin/routes',
    method: 'get'
  });
}
function getRoleList() {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/api/admin/role/list',
    method: 'get'
  });
}
function getAllPermissions() {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/api/admin/permissions',
    method: 'get'
  });
}
function getRoles(filter) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/api/admin/role',
    method: 'get',
    params: filter
  });
}
function getRole(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/api/admin/role/' + id,
    method: 'get'
  });
}
function addRole(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/api/admin/role',
    method: 'post',
    data: data
  });
}
function updateRole(id, data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: "/api/admin/role/".concat(id),
    method: 'put',
    data: data
  });
}
function deleteRole(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: "/api/admin/role/".concat(id),
    method: 'delete'
  });
}

/***/ }),

/***/ "./Resources/assets/js/views/userrole/index.vue":
/*!******************************************************!*\
  !*** ./Resources/assets/js/views/userrole/index.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_51ddb697_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=51ddb697&scoped=true& */ "./Resources/assets/js/views/userrole/index.vue?vue&type=template&id=51ddb697&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./Resources/assets/js/views/userrole/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_51ddb697_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_51ddb697_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "51ddb697",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/js/views/userrole/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/js/views/userrole/index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./Resources/assets/js/views/userrole/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/userrole/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/js/views/userrole/index.vue?vue&type=template&id=51ddb697&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./Resources/assets/js/views/userrole/index.vue?vue&type=template&id=51ddb697&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_51ddb697_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=51ddb697&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/userrole/index.vue?vue&type=template&id=51ddb697&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_51ddb697_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_51ddb697_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/userrole/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/js/views/userrole/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_role_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/role.js */ "./Resources/assets/js/api/role.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "index",
  data: function data() {
    return {
      search: '',
      data: {
        sort_by: '',
        sort_order: '',
        per_page: 5,
        current_page: 1,
        total: 4,
        items: []
      }
    };
  },
  mounted: function mounted() {
    console.log(this.$auth.user);
    this.loadData();
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      Object(_api_role_js__WEBPACK_IMPORTED_MODULE_0__["getRoles"])({
        page: this.data.current_page,
        rows: this.data.per_page,
        sort: this.data.sort_by,
        order: this.data.sort_order,
        s: this.search
      }).then(function (response) {
        var data = response.data,
            meta = response.meta;
        _this.data.items = data;
        _this.data.total = parseInt(meta.total);
        _this.data.current_page = parseInt(meta.current_page);
        _this.data.per_page = parseInt(meta.per_page);
      });
    },
    searchResult: function searchResult() {},
    formatter: function formatter(row, column) {
      return row.address;
    },
    sort_change: function sort_change(sort) {
      this.data.sort_by = sort.prop;

      if (sort.order === 'ascending') {
        this.data.sort_order = 'a';
      } else if (sort.order === 'descending') {
        this.data.sort_order = 'd';
      } else {
        this.data.sort_by = '';
        this.data.sort_order = '';
      }

      this.loadData();
    },
    pageChange: function pageChange(page) {
      this.data.current_page = page;
      this.loadData();
    },
    onAdd: function onAdd() {
      this.$router.push({
        name: 'add_user_role'
      });
    },
    handleEdit: function handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        name: 'edit_user_role',
        params: {
          id: row.id,
          data: row
        }
      });
    },
    handleDelete: function handleDelete(index, row) {
      var _this2 = this;

      Object(_api_role_js__WEBPACK_IMPORTED_MODULE_0__["deleteRole"])(row.id).then(function (response) {
        _this2.$router.push({
          name: 'user_roles'
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/userrole/index.vue?vue&type=template&id=51ddb697&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/js/views/userrole/index.vue?vue&type=template&id=51ddb697&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container card" },
    [
      _c(
        "el-card",
        { staticClass: "box-card" },
        [
          _c(
            "div",
            {
              staticClass: "clearfix",
              attrs: { slot: "header" },
              slot: "header"
            },
            [
              _c("span", { staticClass: "align-text-baseline-middle" }, [
                _vm._v("User Roles")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "float-right" },
                [
                  _c(
                    "el-input",
                    {
                      staticClass: "input-with-select align-top",
                      staticStyle: { width: "250px" },
                      attrs: {
                        size: "medium",
                        placeholder: "Search...",
                        clearable: ""
                      },
                      on: { clear: _vm.loadData },
                      nativeOn: {
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.loadData($event)
                        }
                      },
                      model: {
                        value: _vm.search,
                        callback: function($$v) {
                          _vm.search = $$v
                        },
                        expression: "search"
                      }
                    },
                    [
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        on: { click: _vm.loadData },
                        slot: "append"
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.$auth.hasPermission("role.add")
                    ? _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: { click: _vm.onAdd }
                        },
                        [_vm._v("Add")]
                      )
                    : _vm._e()
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "el-table",
            {
              staticStyle: { width: "100%" },
              attrs: {
                data: _vm.data.items,
                "default-sort": { prop: "date", order: "descending" }
              },
              on: { "sort-change": _vm.sort_change }
            },
            [
              _c("el-table-column", {
                attrs: { prop: "name", label: "Name", sortable: "" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { width: "180", label: "Action" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm.$auth.hasPermission("role.edit")
                          ? _c(
                              "el-button",
                              {
                                attrs: { size: "mini" },
                                on: {
                                  click: function($event) {
                                    return _vm.handleEdit(
                                      scope.$index,
                                      scope.row
                                    )
                                  }
                                }
                              },
                              [_vm._v("Edit")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$auth.hasPermission("role.delete")
                          ? _c(
                              "el-popconfirm",
                              {
                                attrs: {
                                  confirmButtonText: "OK",
                                  cancelButtonText: "No, Thanks",
                                  icon: "el-icon-info",
                                  iconColor: "red",
                                  title: "Are you sure to delete this?"
                                },
                                on: {
                                  onConfirm: function($event) {
                                    return _vm.handleDelete(
                                      scope.$index,
                                      scope.row
                                    )
                                  }
                                }
                              },
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: {
                                      slot: "reference",
                                      size: "mini",
                                      type: "danger"
                                    },
                                    slot: "reference"
                                  },
                                  [_vm._v("Delete")]
                                )
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("el-pagination", {
            staticClass: "mt-4 text-right",
            attrs: {
              background: false,
              "page-size": _vm.data.per_page,
              "current-page": _vm.data.current_page,
              background: "",
              layout: "prev, pager, next",
              total: _vm.data.total
            },
            on: { "current-change": _vm.pageChange }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);