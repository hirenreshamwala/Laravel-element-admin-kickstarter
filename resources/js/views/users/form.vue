<template>
    <div class="container">
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
                        <el-form-item label="Confirm Password" class="el-form-item--label-top" prop="cnf_password">
                            <el-input v-model="form.cnf_password"></el-input>
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
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="onCancel">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if(this.form.id){
                    callback();
                } else {
                    if (value === '') {
                        callback(new Error('Please input the password'));
                    } else {
                        if (this.form.cnf_password !== '') {
                            this.$refs.form.validateField('cnf_password');
                        }
                        callback();
                    }
                }

            };
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.form.password) {
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
                    cnf_password: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        mounted() {
            const self = this;
            axios.get('/admin/get_roles').then(function (response) {
                self.roles = response.data;
            });
            if (this.$route.params.id){
                console.log(this.$route.params.id);
                axios.get('/admin/user/'+this.$route.params.id).then(function (response) {
                    console.log(response);
                    self.form.name = response.data.data.name || '';
                    self.form.username = response.data.data.username || '';
                    self.form.email = response.data.data.email || '';
                    self.form.comment = response.data.data.comment || '';
                    self.form.id = response.data.data.id || '';
                    self.form.userrole = (response.data.data.role && response.data.data.role.name) ? response.data.data.role.name : '';
                });
            } else {

            }
        },
        methods: {
            onSubmit() {
                const self = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (self.form.id){
                            axios.put('/admin/user/'+self.form.id,self.form).then(function (response) {
                                console.log(response);
                                if(response.data.status === 'success'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    self.$router.push('/users/list');
                                } else if(response.data.status === 'error'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            axios.post('/admin/user',self.form).then(function (response) {
                                console.log(response);
                                if(response.data.status === 'success'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    self.$router.push('/users/list');
                                } else if(response.data.status === 'error'){
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
