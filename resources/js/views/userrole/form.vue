<template>
    <div class="container">
        <el-card class="box-card p-5">
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

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="onCancel">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
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
            axios.get('/admin/get_permissions').then(function (response) {
                self.all_permissions = response.data;
                self.moduleWisePermissions = self.modules();
                self.permissions = self.moduleToPermissionTree(self.moduleWisePermissions);
            });
            if (this.$route.params.id){
                axios.get('/admin/role/'+this.$route.params.id).then(function (response) {
                    self.form.id = response.data.data.id || '';
                    self.form.name = response.data.data.name || '';
                    if (response.data.data.permissions){
                        self.form.selectedPermissionIds = response.data.data.permissions.map((e)=>{
                            return e.id;
                        });
                        self.$refs.tree.setCheckedKeys(self.form.selectedPermissionIds);
                    }
                });
            } else {

            }
        },
        methods: {
            // permissions() {
            //     return this.all_permissions.map(permission => permission.name);
            // },
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
                const self = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        const selectedPermissionIds = self.$refs.tree.getCheckedNodes().map((e)=>{
                            return e.id
                        });
                        self.form.permissions = [...new Set(selectedPermissionIds)]

                        if (self.form.id){

                            axios.put('/admin/role/'+self.form.id,self.form).then(function (response) {
                                if(response.data.status === 'success'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    self.$router.push({
                                        name: 'user_roles'
                                    });
                                } else if(response.data.status === 'error'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'error'
                                    });
                                }
                            }).catch(error => {
                                if (error.response && error.response.data) {
                                    if (error.response.data.errors){
                                        const errors = error.response.data.errors;
                                        for(const c in errors){
                                            if (typeof errors[c] === 'object'){
                                                for (const d in errors[c]){
                                                    if(typeof errors[c][d] === 'string'){
                                                        this.$message.error(errors[c][d]);
                                                    }
                                                }
                                            } else if(typeof errors[c] === 'string'){
                                                this.$message.error(errors[c]);
                                            }
                                        }
                                    } else if (error.response.data.message){
                                        this.$message.error(error.response.data.message);
                                    }
                                }
                            });
                        } else {
                            axios.post('/admin/role',self.form).then(function (response) {
                                if(response.data.status === 'success'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    self.$router.push({
                                        name: 'user_roles'
                                    });
                                } else if(response.data.status === 'error'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'error'
                                    });
                                }
                            }).catch(error => {
                                if (error.response && error.response.data) {
                                    if (error.response.data.errors){
                                        const errors = error.response.data.errors;
                                        for(const c in errors){
                                            if (typeof errors[c] === 'object'){
                                                for (const d in errors[c]){
                                                    if(typeof errors[c][d] === 'string'){
                                                        this.$message.error(errors[c][d]);
                                                    }
                                                }
                                            } else if(typeof errors[c] === 'string'){
                                                this.$message.error(errors[c]);
                                            }
                                        }
                                    } else if (error.response.data.message){
                                        this.$message.error(error.response.data.message);
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
