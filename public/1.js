(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/userrole/form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  data: function data() {
    return {
      roles: [],
      all_permissions: [],
      moduleWisePermissions: {},
      permissions: [],
      selectedPermissionIds: [],
      form: {
        id: '',
        name: '',
        permissions: []
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        name: [{
          required: true,
          message: 'Please enter your name',
          trigger: 'blur'
        }]
      }
    };
  },
  mounted: function mounted() {
    var self = this;
    axios.get('/admin/get_permissions').then(function (response) {
      self.all_permissions = response.data;
      self.moduleWisePermissions = self.modules();
      self.permissions = self.moduleToPermissionTree(self.moduleWisePermissions);
    });

    if (this.$route.params.id) {
      axios.get('/admin/role/' + this.$route.params.id).then(function (response) {
        self.form.id = response.data.data.id || '';
        self.form.name = response.data.data.name || '';

        if (response.data.data.permissions) {
          self.form.selectedPermissionIds = response.data.data.permissions.map(function (e) {
            return e.id;
          });
          self.$refs.tree.setCheckedKeys(self.form.selectedPermissionIds);
        }
      });
    } else {}
  },
  methods: {
    // permissions() {
    //     return this.all_permissions.map(permission => permission.name);
    // },
    modules: function modules() {
      var permissions = this.all_permissions;
      var pr = {};

      if (permissions) {
        permissions.map(function (element) {
          var el = element.name;
          var id = element.id;
          var p = el.split('.');
          var module = p.shift();
          if (typeof pr[module] === 'undefined') pr[module] = {};
          var obj = {};
          el.split('.').reduce(function (r, e) {
            typeof r[e] === 'undefined' ? r[e] = {} : '';
            r[e]['value'] = false;
            r[e]['id'] = id;
            return r[e];
          }, obj);
          pr = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(pr, obj);
          return obj;
        });
      }

      return pr;
    },
    moduleToPermissionTree: function moduleToPermissionTree(obj) {
      var data = [];

      function recurse(obj, current) {
        var res = {};

        for (var key in obj) {
          var value = obj[key];

          if (value != undefined) {
            var cur = {
              'id': value.id,
              'label': key,
              'children': []
            };

            if (typeof current.children === 'undefined') {
              current.push(cur);
            } else {
              if (key !== 'value' && key !== 'id') current.children.push(cur);
            }

            if (value && _typeof(value) === 'object') {
              if (["value", "id"].equals(Object.keys(obj[key]))) {// console.log(current, key,obj[key]);
              } else {
                // let difference = Object.keys(obj[key]).filter(x => !["value", "id"].includes(x));
                // console.log(current,key,difference);
                // console.log(key);
                recurse(value, cur);
              }
            } else {}
          }
        }
      }

      recurse(obj, data);
      return data;
    },
    onSubmit: function onSubmit() {
      var _this = this;

      var self = this;
      this.$refs['form'].validate(function (valid) {
        if (valid) {
          var selectedPermissionIds = self.$refs.tree.getCheckedNodes().map(function (e) {
            return e.id;
          });
          self.form.permissions = _toConsumableArray(new Set(selectedPermissionIds));

          if (self.form.id) {
            axios.put('/admin/role/' + self.form.id, self.form).then(function (response) {
              if (response.data.status === 'success') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
                self.$router.push({
                  name: 'user_roles'
                });
              } else if (response.data.status === 'error') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
            })["catch"](function (error) {
              if (error.response && error.response.data) {
                if (error.response.data.errors) {
                  var errors = error.response.data.errors;

                  for (var c in errors) {
                    if (_typeof(errors[c]) === 'object') {
                      for (var d in errors[c]) {
                        if (typeof errors[c][d] === 'string') {
                          _this.$message.error(errors[c][d]);
                        }
                      }
                    } else if (typeof errors[c] === 'string') {
                      _this.$message.error(errors[c]);
                    }
                  }
                } else if (error.response.data.message) {
                  _this.$message.error(error.response.data.message);
                }
              }
            });
          } else {
            axios.post('/admin/role', self.form).then(function (response) {
              if (response.data.status === 'success') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
                self.$router.push({
                  name: 'user_roles'
                });
              } else if (response.data.status === 'error') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
            })["catch"](function (error) {
              if (error.response && error.response.data) {
                if (error.response.data.errors) {
                  var errors = error.response.data.errors;

                  for (var c in errors) {
                    if (_typeof(errors[c]) === 'object') {
                      for (var d in errors[c]) {
                        if (typeof errors[c][d] === 'string') {
                          _this.$message.error(errors[c][d]);
                        }
                      }
                    } else if (typeof errors[c] === 'string') {
                      _this.$message.error(errors[c]);
                    }
                  }
                } else if (error.response.data.message) {
                  _this.$message.error(error.response.data.message);
                }
              }
            });
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    onCancel: function onCancel() {
      this.$refs['form'].resetFields();
      this.$router.push({
        name: 'user_roles'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".el-form-item--label-top .el-form-item__label {\n  width: auto!important;\n  float: none;\n  display: inline-block;\n  text-align: left;\n  padding: 0;\n  line-height: 22px;\n}\n.el-form-item--label-top .el-form-item__content {\n  margin-left: 0!important;\n}\n.form-action .el-form-item__content{\n  margin: 0 !important;\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=template&id=70ae383a&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/userrole/form.vue?vue&type=template&id=70ae383a& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    { staticClass: "container" },
    [
      _c(
        "el-card",
        { staticClass: "box-card p-5" },
        [
          _c(
            "el-form",
            {
              ref: "form",
              attrs: {
                rules: _vm.rules,
                model: _vm.form,
                "label-width": "120px"
              }
            },
            [
              _c(
                "el-form-item",
                {
                  staticClass: "el-form-item--label-top",
                  attrs: { label: "Role Name", prop: "name" }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.name,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "name", $$v)
                      },
                      expression: "form.name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("el-tree", {
                ref: "tree",
                attrs: {
                  data: _vm.permissions,
                  "show-checkbox": "",
                  "default-expand-all": "",
                  "default-checked-keys": _vm.selectedPermissionIds,
                  "node-key": "id",
                  "highlight-current": "",
                  props: _vm.defaultProps
                }
              }),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
                    [_vm._v("Create")]
                  ),
                  _vm._v(" "),
                  _c("el-button", { on: { click: _vm.onCancel } }, [
                    _vm._v("Cancel")
                  ])
                ],
                1
              )
            ],
            1
          )
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

/***/ "./resources/js/views/userrole/form.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/userrole/form.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_70ae383a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=70ae383a& */ "./resources/js/views/userrole/form.vue?vue&type=template&id=70ae383a&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/userrole/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.vue?vue&type=style&index=0&lang=css& */ "./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_70ae383a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_70ae383a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/userrole/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/userrole/form.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/userrole/form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/userrole/form.vue?vue&type=template&id=70ae383a&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/userrole/form.vue?vue&type=template&id=70ae383a& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_70ae383a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=70ae383a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/userrole/form.vue?vue&type=template&id=70ae383a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_70ae383a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_70ae383a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);