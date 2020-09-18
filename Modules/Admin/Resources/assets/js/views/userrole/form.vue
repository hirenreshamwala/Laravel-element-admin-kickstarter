<template>
    <div class="container">
        <el-card class="box-card">
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                <el-form-item label="Role Name" class="el-form-item--label-top" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-tree
                    :data="permissions"
                    show-checkbox
                    default-expand-all
                    :default-checked-keys="selectedPermissionIds"
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
                </el-tree>

                <div class="mt-5 text-center">
                    <el-button type="primary" @click="onSubmit">{{ saveText }}</el-button>
                    <el-button @click="onCancel">Cancel</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>
<script>
	import {getAllPermissions, getRole, updateRole, addRole} from '@/api/role.js';
    import _ from "lodash";

    export default {
        data() {

            return {
                roles: [],
                all_permissions: [],
                moduleWisePermissions: {},
                permissions: [],
                selectedPermissionIds: [],
                form: {
                    id: '',
                    name: '',
                    permissions: [],
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                rules: {
                    name: [
                        { required: true, message: 'Please enter your name', trigger: 'blur' },
                    ]
                }
            };
        },
        mounted() {
            const self = this;
			getAllPermissions().then(response=>{
				this.all_permissions = response;
				this.moduleWisePermissions = this.modules();
				this.permissions = this.moduleToPermissionTree(this.moduleWisePermissions);
			});
            if (this.$route.params.id){
				getRole(this.$route.params.id).then(response => {
					const { data } = response;
					this.form.id = data.id || '';
					this.form.name = data.name || '';
					if (data.permissions){
						this.form.selectedPermissionIds = data.permissions.map((e)=>{
							return e.id;
						});
						this.$refs.tree.setCheckedKeys(this.form.selectedPermissionIds);
					}
				});
            } else {

            }
        },
		computed: {
			saveText() {
				return this.$route.params.id ? 'Update' : 'Create';
			}
		},
        methods: {
            modules(){
                let permissions = this.all_permissions;
                let pr = {};
                if(permissions){
                    permissions.map(function(element){
                        let el = element.name;
                        let id = element.id;
                        let p = el.split('.');
                        let module = p.shift();
                        if(typeof pr[module] === 'undefined')  pr[module] = {};
                        let obj = {};

                        el.split('.').reduce((r, e) => {
                            (typeof r[e] === 'undefined') ? r[e] = {} : '';
                            r[e]['value'] = false;
                            r[e]['id'] = id;
                            return r[e];
                        }, obj);
                        pr = _.merge(pr, obj);
                        return obj;
                    });
                }
                return pr;
            },
            moduleToPermissionTree(obj) {
                let data = [];
                function recurse(obj, current){
                    const res = {};
                    for (const key in obj) {
                        let value = obj[key];
                        if(value != undefined) {
                            let cur = {
                                'id' : value.id,
                                'label' : key,
                                'children': []
                            };
                            if (typeof current.children === 'undefined'){
                                current.push(cur)
                            } else {
                                if (key !== 'value' && key !== 'id')
                                    current.children.push(cur);
                            }

                            if (value && typeof value === 'object') {
                                if(["value", "id"].equals(Object.keys(obj[key]))){
                                    // console.log(current, key,obj[key]);
                                } else {
                                    // let difference = Object.keys(obj[key]).filter(x => !["value", "id"].includes(x));
                                    // console.log(current,key,difference);
                                    // console.log(key);
                                    recurse(value, cur)
                                }
                            } else {

                            }
                        }
                    }
                }
                recurse(obj,data);
                return data;
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        const selectedPermissionIds = this.$refs.tree.getCheckedNodes().map((e)=>{
                            return e.id
                        });
                        this.form.permissions = [...new Set(selectedPermissionIds)]

                        if (this.form.id){

							updateRole(this.form.id, this.form).then(response => {
								this.$router.push({
									name: 'user_roles'
								});
							}).catch(error => {});
                        } else {
							addRole(this.form).then((response) => {
								this.$router.push({
									name: 'user_roles'
								});
                            }).catch(error => {});
                        }
                    } else {
                        return false;
                    }
                });
            },
            onCancel(){
                this.$refs['form'].resetFields();
                this.$router.push({
                    name: 'user_roles'
                });
            }
        }
    }
</script>
<style>
    .el-form-item--label-top .el-form-item__label {
        width: auto!important;
        float: none;
        display: inline-block;
        text-align: left;
        padding: 0;
        line-height: 22px;
    }

    .el-form-item--label-top .el-form-item__content {
        margin-left: 0!important;
    }
    .form-action .el-form-item__content{
        margin: 0 !important;
        text-align: center;
    }
</style>
