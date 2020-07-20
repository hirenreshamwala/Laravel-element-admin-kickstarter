<template>
    <div>
        <el-row class="m-0 p-0">
            <el-col :span="12" :md="{span:12}" :sm="{span:12}" :xs="{span:0}">
                <img class="object-cover h-full w-full" src="../../assets/images/login-bg-2.png">
            </el-col>
            <el-col :span="12" :md="{span:12}" :sm="{span:12}" :xs="{span:24}">
                <div class="login_form">
                    <h1 class="logo">{{ appdata.name }}</h1>
                    <h6 class="welcome-text">Welcome back! Please login to your account.</h6>
                    <el-form label-width="120px" class="mt-10" :action="params.action" method="POST" ref="login_form">
                        <el-input placeholder="Username" name="email" required autocomplete="user_name" autofocus v-model="loginData.email"></el-input>
                        <el-input placeholder="Password" name="password" type="password" autocomplete="off" required v-model="loginData.password"></el-input>
                        <input
                            type="hidden"
                            name="_token"
                            v-model="params._token"
                        />
                        <el-row class="mt-2">
                            <el-col :span="12">
                                <el-checkbox label="Remember Me" name="remember"  ></el-checkbox>
                            </el-col>
                            <el-col :span="12" class="text-right">
                                <el-link v-if="isForgotPassword" :underline="false" :href="params.lostpwd">Forgot Your Password?</el-link>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12" :offset="6" class="text-center"><el-button native-type="submit">Login</el-button></el-col>
                        </el-row>
                        <p class="el-register-btn">
                            Don't have account? <el-link v-if="isForgotPassword" :underline="false" :href="params.lostpwd" class="-mt-1">Click here to register</el-link>
                        </p>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        mounted() {
            const self = this;
            if(this.params.old_email){
                this.loginData.email = this.params.old_email;
            }

            if(this.params.lostpwd){
                this.isForgotPassword = true;
            }

            if(this.errors){
                for(var i in this.errors){
                    if(Array.isArray(this.errors[i]) && this.errors[i].length > 0){
                        this.errors[i].forEach(function(er){
                            self.$message.error(er);
                        });
                    }
                }
            }
        },
        data: () => ({
            drawer: false,
            isForgotPassword: false,
            isRegister: true,
            loginData: {
                email: '',
                password: ''
            }
        }),
        props: [
            'errors',
            'params',
            'appdata'
        ],
        methods: {
            doLogin(){
                this.$refs.login_form.$el.submit();
            }
        }
    };
</script>
<style scoped>
    .logo{
        font-size: 40px;
        letter-spacing: 10px;
        text-align: center;
    }
    .welcome-text{
        font-size: 14px;
        color: #909399;
        text-align: center;
    }
    .login_form{
        max-width: 450px;
        margin: 90px auto 10px auto;
        padding: 0 10px;
    }
    .el-form .el-input{
        margin: 7px 0;
    }
    .el-register-btn{
        color: #606266;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        margin-top: 20px;
    }
    /*.el-row{
        margin: 0;
        padding: 0;
    }*/
</style>
