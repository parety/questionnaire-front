<template>
    <div class="logContainer">
		<div class="register">
			<form>
				<label for="registerName">user</label>
				<br>
				<input type="text" v-model="registerName" placeholder="请输入昵称" />
				<br />
				<label for="registerPassword">password</label>
				<br>
				<input type="password" v-model="registerPassword" placeholder="不少于6位" />
				<br />
				<input @click.prevent="register" class="btn" type="submit" value="注册">
			</form>
		</div>
		<div class="login">
			<form>
				<label for="loginName">user</label>
				<br>
				<input type="text" v-model="loginName" placeholder="请输入昵称" />
				<br />
				<label for="loginPassword">password</label>
				<br>
				<input type="password" v-model="loginPassword" placeholder="请输入password" />
				<br />
				<input @click.prevent="login" class="btn" type="submit" value="登录">
			</form>
		</div>
    </div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store.js'

export default {
    data () {
        return {
            registerName: '',
            registerPassword: '',
            loginName: '',
            loginPassword: ''
        }
    },
    methods: {
        register () {
            // 密码格式不对  显示消息框
            if (this.registerPassword.length < 6 || this.registerPassword.length > 10) {
                this.registerPassword = ''
                bus.$emit('msg', {
                    message: '请重新输入密码',
                    type: 'fail'
                })
                return
            }
            this.$http.post('/api/register', {registerName: this.registerName, registerPassword: this.registerPassword}).then((res) => {
                // 注册失败
                if (res.body.code) {
                    bus.$emit('msg', {
                        message: '注册失败，请重试',
                        type: 'fail'
                    })
                // 注册成功
                } else {
                    bus.$emit('msg', {
                        message: '注册成功',
                        type: 'success'
                    })
                    bus.$emit('login', {
                        username: this.registerName,
                        id: res.body.id
                    })
                    // 储存用户信息到本地
                    window.sessionStorage.user = JSON.stringify({
                        username: this.registerName,
                        id: res.body.id
                    })
                    bus.user = {
                        username: this.registerName,
                        id: res.body.id
                    }
                    // 跳转至个人中心
                    this.$router.push({path: `/user/${res.body.id}`})
                }
            })
        },
        login () {
            if (!this.loginName || !this.loginPassword) {
                bus.$emit('msg', {
                    message: '用户名或密码不能为空',
                    type: 'fail'
                })
                return
            }
            this.$http.post('/api/login', {loginName: this.loginName, loginPassword: this.loginPassword}).then((res) => {
                // 登陆失败
                if (res.body.code) {
                    bus.$emit('msg', {
                        message: '登录失败，请重试',
                        type: 'fail'
                    })
                } else {
                    bus.$emit('msg', {
                        message: '登录成功',
                        type: 'success'
                    })
                    bus.$emit('login', {
                        username: this.loginName,
                        id: res.body.id
                    })
                    // 储存用户信息到本地
                    window.sessionStorage.user = JSON.stringify({
                        username: this.loginName,
                        id: res.body.id
                    })
                    bus.user = {
                        username: this.loginName,
                        id: res.body.id
                    }
                    // 跳转至个人中心
                    this.$router.push({path: `/user/${res.body.id}`})
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.logContainer
    margin: 200px auto
    width: 600px
    .register
        float: left
        width: 199px
        padding: 50px
        border-right: 1px dashed #999
    .login
        float: left
        width: 200px
        padding: 50px
    label 
        font-size: 16px
        line-height: 30px
        font-weight: 500
    input 
        width: 200px
        font-size: 14px
        line-height: 24px
        text-indent: 10px
        outline: none
    .btn
        width: 40px
        margin-top: 10px
        border-radius: 5px
        text-align: center
        background: #ee7419
        color: #fff
        text-indent: 0
</style>
