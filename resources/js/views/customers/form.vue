<template>
    <div class="container" v-loading="loading">
        <el-card class="box-card p-5">
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">

                <el-row :gutter="20">
                    <el-col :span="24" :lg="8" :sm="8" :md="8">
                        <el-form-item label="Name" class="el-form-item--label-top" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="8" :sm="8" :md="8">
                        <el-form-item label="Email" class="el-form-item--label-top" prop="email">
                            <el-input type="email" v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="8" :sm="8" :md="8">
                        <el-form-item label="Mobile Number" class="el-form-item--label-top" prop="contact_number">
                            <el-input type="number" v-model="form.contact_number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24" :lg="12" :sm="12" :md="12">
                        <el-form-item label="Address" class="el-form-item--label-top">
                            <el-input type="textarea" v-model="form.address" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12" :sm="12" :md="12">
                        <el-form-item label="Comment" class="el-form-item--label-top">
                            <el-input type="textarea" v-model="form.comment" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24" :lg="12" :sm="12" :md="12">
                        <el-form-item label="State" class="el-form-item--label-top">
                            <el-input v-model="form.state"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12" :sm="12" :md="12">
                        <el-form-item label="City" class="el-form-item--label-top">
                            <el-input v-model="form.city"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24" :lg="12" :sm="12" :md="12">
                        <el-form-item label="Password" class="el-form-item--label-top" prop="password">
                            <el-input type="password" v-model="form.password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12" :sm="12" :md="12">
                        <el-form-item label="Confirm Password" class="el-form-item--label-top" prop="password_confirmation">
                            <el-input type="password" v-model="form.password_confirmation"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div class="text-center">
                    <el-button type="primary" @click="onSubmit">{{save_button_text}}</el-button>
                    <el-button @click="onCancel">Cancel</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import {create,update,fetchUser} from '@/api/customer';
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
                    address: '',
                    contact_number: '',
                    state: '',
                    city: '',
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
                    contact_number: [
                        { required: true, number: true, message: 'Please enter valid contact number', trigger: 'blur' }
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
        watch:{
            email(val){
                this.form.username = val;
            }
        },
        computed: {
            email(){
                return this.form.email;
            },
            save_button_text: function(){
                return this.form.id ? 'Save' : 'Create';
            }
        },
        mounted() {
            const self = this;
            axios.get('/admin/get_roles').then(function (response) {
                self.roles = response.data;
            });
            if (this.$route.params.id){
                this.loading = true;
                fetchUser(this.$route.params.id).then((response)=>{
                    this.form.name = response.data.name || '';
                    this.form.last_name = response.data.last_name || '';
                    this.form.username = response.data.email || '';
                    this.form.email = response.data.email || '';
                    this.form.comment = response.data.comment || '';
                    this.form.address = response.data.address || '';
                    this.form.contact_number = response.data.contact_number || '';
                    this.form.state = response.data.state || '';
                    this.form.city = response.data.city || '';
                    this.form.id = response.data.id || '';
                    this.form.exid = response.data.exid || '';
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
                        if (this.form.id){
                            this.loading = true;
                            update(this.form.exid,this.form).then(response=>{
                                this.$router.push({name:'list_customer'});
                            }).finally(()=>{
                                this.loading = false;
                            });
                        } else {
                            this.loading = true;
                            create(this.form).then(response=>{
                                this.$router.push({name:'list_customer'});
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
                this.$router.push({name:'list_customer'});
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
