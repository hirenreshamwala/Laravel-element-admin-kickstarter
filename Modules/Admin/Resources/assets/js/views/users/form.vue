<template>
    <div class="container" v-loading="loading">
        <el-card class="box-card p-5">
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                <el-form-item label="Name" class="el-form-item--label-top" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Username" class="el-form-item--label-top" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="Email" class="el-form-item--label-top" prop="email">
                    <el-input type="email" v-model="form.email"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Password" class="el-form-item--label-top" prop="password">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Confirm Password" class="el-form-item--label-top" prop="password_confirmation">
                            <el-input v-model="form.password_confirmation"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item label="User Role" class="el-form-item--label-top" prop="userrole">
                    <el-select v-model="form.userrole" placeholder="User Role">
                        <el-option v-for="(item,index) in roles" :key="'role-'+index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="User Status" class="el-form-item--label-top">
                    <el-switch v-model="form.status"></el-switch>
                </el-form-item>

                <el-form-item label="Comment" class="el-form-item--label-top">
                    <el-input type="textarea" v-model="form.comment"></el-input>
                </el-form-item>

                <div class="text-center">
                    <el-button type="primary" @click="onSubmit">{{save_button_text}}</el-button>
                    <el-button @click="onCancel">Cancel</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import {create,update,fetchUser} from '@/api/user';
    import {getRoleList} from '@/api/role';
    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (this.form.id) {
                    callback();
                } else {
                    if (value === '') {
                        callback(new Error('Please input the password'));
                    } else {
                        if (this.form.password_confirmation !== '') {
                            this.$refs.form.validateField('password_confirmation');
                        }
                        callback();
                    }
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value !== this.form.password) {
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
                    name: [
                        { required: true, message: 'Please enter your name', trigger: 'blur' },
                    ],
                    username: [
                        { required: true, message: 'Please enter username', trigger: 'blur' },
                        { min: 3, message: 'Length should be at least 3', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, email: true, message: 'Please input email', trigger: 'blur' }
                    ],
                    userrole: [
                        { required: true, message: 'Please select user role', trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password_confirmation: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        computed:{
            save_button_text(){
                return this.form.exid ? 'Save' : 'Create';
            }
        },
        mounted() {
			getRoleList().then((response)=>{
                this.roles = response;
            });
            if (this.$route.params.id){
                this.loading = true;
                fetchUser(this.$route.params.id).then((response)=>{
                    this.form.name = response.data.name || '';
                    this.form.username = response.data.username || '';
                    this.form.email = response.data.email || '';
                    this.form.comment = response.data.comment || '';
                    this.form.id = response.data.id || '';
                    this.form.exid = response.data.exid || '';
					this.form.status = !!response.data.status;
                    this.form.userrole = (response.data.role && response.data.role.name) ? response.data.role.name : '';
                }).finally(()=>{
                    this.loading = false;
                });
            } else {

            }
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (this.form.exid){
                            this.loading = true;
                            update(this.form.exid,this.form).then(response=>{
                                this.$router.push('/users/list');
                            }).finally(()=>{
                                this.loading = false;
                            });
                        } else {
                            this.loading = true;
                            create(this.form).then(response=>{
                                console.log(response);
                                this.$router.push('/users/list');
                            }).finally(()=>{
                                this.loading = false;
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onCancel(){
                this.$refs['form'].resetFields();
                this.$router.push('/users/list');
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
