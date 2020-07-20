(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/users/form.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
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
          if (_this.form.cnf_password !== '') {
            _this.$refs.form.validateField('cnf_password');
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
      roles: [],
      form: {
        id: '',
        name: '',
        username: '',
        email: '',
        userrole: '',
        status: true,
        comment: '',
        password: '',
        cnf_password: ''
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
        cnf_password: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    };
  },
  mounted: function mounted() {
    var self = this;
    axios.get('/admin/get_roles').then(function (response) {
      self.roles = response.data;
    });

    if (this.$route.params.id) {
      console.log(this.$route.params.id);
      axios.get('/admin/user/' + this.$route.params.id).then(function (response) {
        console.log(response);
        self.form.name = response.data.data.name || '';
        self.form.username = response.data.data.username || '';
        self.form.email = response.data.data.email || '';
        self.form.comment = response.data.data.comment || '';
        self.form.id = response.data.data.id || '';
        self.form.userrole = response.data.data.role && response.data.data.role.name ? response.data.data.role.name : '';
      });
    } else {}
  },
  methods: {
    onSubmit: function onSubmit() {
      var self = this;
      this.$refs['form'].validate(function (valid) {
        if (valid) {
          if (self.form.id) {
            axios.put('/admin/user/' + self.form.id, self.form).then(function (response) {
              console.log(response);

              if (response.data.status === 'success') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
                self.$router.push('/users/list');
              } else if (response.data.status === 'error') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
            });
          } else {
            axios.post('/admin/user', self.form).then(function (response) {
              console.log(response);

              if (response.data.status === 'success') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'success'
                });
                self.$router.push('/users/list');
              } else if (response.data.status === 'error') {
                self.$message({
                  showClose: true,
                  message: response.data.message,
                  type: 'error'
                });
              }
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".el-form-item--label-top .el-form-item__label {\n  width: auto!important;\n  float: none;\n  display: inline-block;\n  text-align: left;\n  padding: 0;\n  line-height: 22px;\n}\n.el-form-item--label-top .el-form-item__content {\n  margin-left: 0!important;\n}\n.form-action .el-form-item__content{\n  margin: 0 !important;\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=template&id=29b4192a&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/users/form.vue?vue&type=template&id=29b4192a& ***!
  \********************************************************************************************************************************************************************************************************/
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
                            prop: "cnf_password"
                          }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.cnf_password,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "cnf_password", $$v)
                              },
                              expression: "form.cnf_password"
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

/***/ "./resources/js/views/users/form.vue":
/*!*******************************************!*\
  !*** ./resources/js/views/users/form.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_29b4192a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=29b4192a& */ "./resources/js/views/users/form.vue?vue&type=template&id=29b4192a&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/users/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.vue?vue&type=style&index=0&lang=css& */ "./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_29b4192a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_29b4192a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/users/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/users/form.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/views/users/form.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/users/form.vue?vue&type=template&id=29b4192a&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/users/form.vue?vue&type=template&id=29b4192a& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_29b4192a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=29b4192a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/users/form.vue?vue&type=template&id=29b4192a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_29b4192a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_29b4192a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);