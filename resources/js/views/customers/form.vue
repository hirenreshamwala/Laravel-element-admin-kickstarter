<template>
    <div class="container">
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
                        <el-form-item label="Confirm Password" class="el-form-item--label-top" prop="cnf_password">
                            <el-input type="password" v-model="form.cnf_password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{save_button_text}}</el-button>
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
                    contact_number: [
                        { required: true, number: true, message: 'Please enter valid contact number', trigger: 'blur' }
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
        computed: {
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
                console.log(this.$route.params.id);
                axios.get('/admin/customer/'+this.$route.params.id).then(function (response) {
                    console.log(response);
                    self.form.name = response.data.data.name || '';
                    self.form.last_name = response.data.data.last_name || '';
                    self.form.username = response.data.data.email || '';
                    self.form.email = response.data.data.email || '';
                    self.form.comment = response.data.data.comment || '';
                    self.form.address = response.data.data.address || '';
                    self.form.contact_number = response.data.data.contact_number || '';
                    self.form.state = response.data.data.state || '';
                    self.form.city = response.data.data.city || '';
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
                            axios.put('/admin/customer/'+self.form.id,self.form, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }).then(function (response) {
                                console.log(response);
                                if(response.data.status === 'success'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    self.$router.push({name:'list_customer'});
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
                            axios.post('/admin/customer',self.form, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }).then(function (response) {
                                console.log(response);
                                if(response.data.status === 'success'){
                                    self.$message({
                                        showClose: true,
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    self.$router.push({name:'list_customer'});
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
