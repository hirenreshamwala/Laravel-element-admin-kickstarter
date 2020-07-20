(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/customers/index.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/customers/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    this.loadData();
  },
  methods: {
    loadData: function loadData() {
      var self = this;
      axios.get('/admin/customer', {
        params: {
          page: this.data.current_page,
          rows: this.data.per_page,
          sort: this.data.sort_by,
          order: this.data.sort_order,
          s: this.search
        }
      }).then(function (response) {
        self.data.items = response.data.data;
        self.data.total = parseInt(response.data.meta.total);
        self.data.current_page = parseInt(response.data.meta.current_page);
        self.data.per_page = parseInt(response.data.meta.per_page);
      });
    },
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
      if (this.$auth.hasPermission('customer.add')) this.$router.push({
        name: 'add_customer'
      });
    },
    handleEdit: function handleEdit(index, row) {
      if (this.$auth.hasPermission('customer.edit')) this.$router.push({
        name: 'edit_customer',
        params: {
          id: row.id,
          data: row
        }
      });
    },
    handleDelete: function handleDelete(index, row) {
      var self = this;
      axios["delete"]('/admin/customer/' + row.id).then(function (response) {
        if (response.data.status === 'success') {
          self.$message({
            showClose: true,
            message: response.data.message,
            type: 'success'
          });
          self.$router.push({
            name: 'user_list'
          });
        } else if (response.data.status === 'error') {
          self.$message({
            showClose: true,
            message: response.data.message,
            type: 'error'
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/customers/index.vue?vue&type=template&id=47502de9&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/customers/index.vue?vue&type=template&id=47502de9&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
                _vm._v("Customers")
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
                  _vm.$auth.hasPermission("customer.add")
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
                attrs: { prop: "username", label: "Username", sortable: "" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { prop: "email", label: "Email", sortable: "" }
              }),
              _vm._v(" "),
              _vm.$auth.hasPermission("customer.edit") ||
              _vm.$auth.hasPermission("customer.delete")
                ? _c("el-table-column", {
                    attrs: { label: "Action" },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _vm.$auth.hasPermission("customer.edit")
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
                              _vm.$auth.hasPermission("customer.delete")
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
                      ],
                      null,
                      false,
                      61408137
                    )
                  })
                : _vm._e()
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



/***/ }),

/***/ "./resources/js/views/customers/index.vue":
/*!************************************************!*\
  !*** ./resources/js/views/customers/index.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_47502de9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=47502de9&scoped=true& */ "./resources/js/views/customers/index.vue?vue&type=template&id=47502de9&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/customers/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_47502de9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_47502de9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "47502de9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/customers/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/customers/index.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/customers/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/customers/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/customers/index.vue?vue&type=template&id=47502de9&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/customers/index.vue?vue&type=template&id=47502de9&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_47502de9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=47502de9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/customers/index.vue?vue&type=template&id=47502de9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_47502de9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_47502de9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);