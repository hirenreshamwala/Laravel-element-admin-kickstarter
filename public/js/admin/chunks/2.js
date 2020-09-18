(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ "./Resources/assets/js/views/users/form.vue":
/*!**************************************************!*\
  !*** ./Resources/assets/js/views/users/form.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_89f7e604___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=89f7e604& */ "./Resources/assets/js/views/users/form.vue?vue&type=template&id=89f7e604&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./Resources/assets/js/views/users/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.vue?vue&type=style&index=0&lang=css& */ "./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_89f7e604___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_89f7e604___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/js/views/users/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/js/views/users/form.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./Resources/assets/js/views/users/form.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************!*\
  !*** ./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./Resources/assets/js/views/users/form.vue?vue&type=template&id=89f7e604&":
/*!*********************************************************************************!*\
  !*** ./Resources/assets/js/views/users/form.vue?vue&type=template&id=89f7e604& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_89f7e604___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=89f7e604& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=template&id=89f7e604&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_89f7e604___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_89f7e604___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/js/views/users/form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/user */ "./Resources/assets/js/api/user.js");
/* harmony import */ var _api_role__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/role */ "./Resources/assets/js/api/role.js");
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
  data: function data() {
    var _this = this;

    var validatePass = function validatePass(rule, value, callback) {
      if (_this.form.id) {
        callback();
      } else {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (_this.form.password_confirmation !== '') {
            _this.$refs.form.validateField('password_confirmation');
          }

          callback();
        }
      }
    };

    var validatePass2 = function validatePass2(rule, value, callback) {
      if (value !== _this.form.password) {
        callback(new Error('Password don\'t match!'));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      roles: [],
      form: {
        id: '',
        exid: '',
        name: '',
        username: '',
        email: '',
        userrole: '',
        status: true,
        comment: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        name: [{
          required: true,
          message: 'Please enter your name',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: 'Please enter username',
          trigger: 'blur'
        }, {
          min: 3,
          message: 'Length should be at least 3',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          email: true,
          message: 'Please input email',
          trigger: 'blur'
        }],
        userrole: [{
          required: true,
          message: 'Please select user role',
          trigger: 'blur'
        }],
        password: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        password_confirmation: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    };
  },
  computed: {
    save_button_text: function save_button_text() {
      return this.form.exid ? 'Save' : 'Create';
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    Object(_api_role__WEBPACK_IMPORTED_MODULE_1__["getRoleList"])().then(function (response) {
      _this2.roles = response;
    });

    if (this.$route.params.id) {
      this.loading = true;
      Object(_api_user__WEBPACK_IMPORTED_MODULE_0__["fetchUser"])(this.$route.params.id).then(function (response) {
        _this2.form.name = response.data.name || '';
        _this2.form.username = response.data.username || '';
        _this2.form.email = response.data.email || '';
        _this2.form.comment = response.data.comment || '';
        _this2.form.id = response.data.id || '';
        _this2.form.exid = response.data.exid || '';
        _this2.form.status = !!response.data.status;
        _this2.form.userrole = response.data.role && response.data.role.name ? response.data.role.name : '';
      })["finally"](function () {
        _this2.loading = false;
      });
    } else {}
  },
  methods: {
    onSubmit: function onSubmit() {
      var _this3 = this;

      this.$refs['form'].validate(function (valid) {
        if (valid) {
          if (_this3.form.exid) {
            _this3.loading = true;
            Object(_api_user__WEBPACK_IMPORTED_MODULE_0__["update"])(_this3.form.exid, _this3.form).then(function (response) {
              _this3.$router.push('/users/list');
            })["finally"](function () {
              _this3.loading = false;
            });
          } else {
            _this3.loading = true;
            Object(_api_user__WEBPACK_IMPORTED_MODULE_0__["create"])(_this3.form).then(function (response) {
              console.log(response);

              _this3.$router.push('/users/list');
            })["finally"](function () {
              _this3.loading = false;
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onCancel: function onCancel() {
      this.$refs['form'].resetFields();
      this.$router.push('/users/list');
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".el-form-item--label-top .el-form-item__label {\n  width: auto!important;\n  float: none;\n  display: inline-block;\n  text-align: left;\n  padding: 0;\n  line-height: 22px;\n}\n.el-form-item--label-top .el-form-item__content {\n  margin-left: 0!important;\n}\n.form-action .el-form-item__content{\n  margin: 0 !important;\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/js/views/users/form.vue?vue&type=template&id=89f7e604&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/js/views/users/form.vue?vue&type=template&id=89f7e604& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ],
      staticClass: "container"
    },
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
                  attrs: { label: "Name", prop: "name" }
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
              _c(
                "el-form-item",
                {
                  staticClass: "el-form-item--label-top",
                  attrs: { label: "Username", prop: "username" }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.username,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "username", $$v)
                      },
                      expression: "form.username"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                {
                  staticClass: "el-form-item--label-top",
                  attrs: { label: "Email", prop: "email" }
                },
                [
                  _c("el-input", {
                    attrs: { type: "email" },
                    model: {
                      value: _vm.form.email,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "email", $$v)
                      },
                      expression: "form.email"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-row",
                { attrs: { gutter: 20 } },
                [
                  _c(
                    "el-col",
                    { attrs: { span: 12 } },
                    [
                      _c(
                        "el-form-item",
                        {
                          staticClass: "el-form-item--label-top",
                          attrs: { label: "Password", prop: "password" }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.password,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "password", $$v)
                              },
                              expression: "form.password"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 12 } },
                    [
                      _c(
                        "el-form-item",
                        {
                          staticClass: "el-form-item--label-top",
                          attrs: {
                            label: "Confirm Password",
                            prop: "password_confirmation"
                          }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.password_confirmation,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "password_confirmation", $$v)
                              },
                              expression: "form.password_confirmation"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                {
                  staticClass: "el-form-item--label-top",
                  attrs: { label: "User Role", prop: "userrole" }
                },
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "User Role" },
                      model: {
                        value: _vm.form.userrole,
                        callback: function($$v) {
                          _vm.$set(_vm.form, "userrole", $$v)
                        },
                        expression: "form.userrole"
                      }
                    },
                    _vm._l(_vm.roles, function(item, index) {
                      return _c("el-option", {
                        key: "role-" + index,
                        attrs: { label: item.name, value: item.name }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                {
                  staticClass: "el-form-item--label-top",
                  attrs: { label: "User Status" }
                },
                [
                  _c("el-switch", {
                    model: {
                      value: _vm.form.status,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "status", $$v)
                      },
                      expression: "form.status"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                {
                  staticClass: "el-form-item--label-top",
                  attrs: { label: "Comment" }
                },
                [
                  _c("el-input", {
                    attrs: { type: "textarea" },
                    model: {
                      value: _vm.form.comment,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "comment", $$v)
                      },
                      expression: "form.comment"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-center" },
                [
                  _c(
                    "el-button",
                    { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
                    [_vm._v(_vm._s(_vm.save_button_text))]
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



/***/ })

}]);