<template>
    <div class="loginBox">
        <h2>CRM客户管理系统</h2>
        <h3>为了宝具企业的数据安全，请妥善保管密码</h3>
        <div>
            <el-input v-model="username" class="inp" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
            <el-input v-model="password" prefix-icon=" el-icon-s-promotion" class="inp" placeholder="请输入用户密码"></el-input>
           
            <el-button type="primary" class="btn" @click="login">登录</el-button>
        </div>
        <p>我是板牙拖车</p>
    </div>
</template>
<script>
    // @==>/src
    import {login} from '@/api/login.js';

    export default {
        name:'login',
        data(){
            return {
                username:'',
                password:''
            }
        },
        methods:{
            login(){
                if(!this.username || !this.password){
                    // this.$message.error('用户名个密码不能为空')
                    this.$message({
                        message:'用户名个密码不能为空',
                        showClose:true,
                        type:'error'
                    })
                }
               // 在真实的工作中，会把所有的请求方法封装到api文件夹中
               let obj = {
                   account:this.username,
                   password:this.password
               }
               login(obj).then(data=>{
                   if(data.code == 1){
                       this.$alert('用户名或者密码错误','提示',{
                           confirmButtonText:'知道了'
                       })
                   }
                   if(data.code == 0){
                       localStorage.setItem('power',data.power);
                        this.$alert('恭喜您，登录成功','提示',{
                           confirmButtonText:'好的',
                           callback:action=>{
                               console.log(action)
                               this.$router.push('/')
                           }
                       })
                   }
               })
            }
        }
    }
</script>
<style lang="less" scoped>

    .loginBox {
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(255, 68, 0, 0.192);
        position: fixed;
        top:0;
        left:0;
        h2 {
            height: 60px;
            line-height: 60px;
            margin-top: 70px;
        }
        h3 {
            margin: 30px 0;
        }
        >div {
            width: 300px;
            background: #fff;
            margin: auto;
            padding-top: 20px;
            .inp {
                width: 80%;
                margin: 5px auto;
            }
            .btn {
                width: 80%;
                margin: 20px auto;
            }
        }
        >p {
            position: absolute;
            bottom: 10px;
            width: 100%;
            text-align: center;
        }
        
    }
</style>