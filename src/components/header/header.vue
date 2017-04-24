<template>
    <div id="header">
        <span class="mark">?</span>
        <router-link :to="{name: 'all'}" class="title">问卷调查</router-link>
        <router-link :to="{path: `/user/${user.id}`}" class="myQuestionaire">我的问卷</router-link>
        <div class="logGroup">
            <div class="logInGroup" v-if="!user.username">
                <router-link :to="{name: 'login'}">登录</router-link>
                <span>/</span>
                <router-link :to="{name: 'register'}">注册</router-link>
            </div>
            <div class="logOutGroup" v-else @click="panelShow = !panelShow">
                <span class="icon-user">{{user.username}}</span> 
                <div class="panel" v-show="panelShow">
                    <router-link :to="{path: `/user/${user.id}`}">我的发布</router-link>
                    <a @click="logout">退出</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store.js'

export default {
    data () {
        return {
            user: {},
            panelShow: false
        }
    },
    mounted () {
        // 防止刷新后登录状态丢失
        if (bus.user) {
            this.user = bus.user
        }
        // 接受登录消息
        bus.$on('login', (user) => {
            this.user = user
        })
    },
    methods: {
        logout () {
            // 防止登录时直接弹出退出框
            this.panelShow = false
            this.user = {}
            // 删除本地缓存的用户信息
            bus.user = {}
            window.sessionStorage.removeItem('user')
            this.$router.push({name: 'all'})
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#header
    height : 20px
    padding : 10px 0 10px 40px
    font-size : 14px
    line-height : 20px
    background : #ee7419
    .mark
        display : inline-block
        width : 20px
        height : 20px
        border-radius : 10px
        text-align : center
        font-weight : bolder
        color : #ee7419
        background : #fff
    .title
        color : #fff
        font-weight : bolder
    .myQuestionaire
        margin-left : 60px
        color : #fff
    .logGroup
        display: inline-block
        float: right
        width: 100px
        text-align: center 
        color: #fff
        cursor: pointer
        a 
            color: #fff
        .logOutGroup
            position: relative
            .panel
                padding: 6px 0
                position: absolute
                top: 34px
                left: 0
                width: 100px
                z-index: 999
                background: #ee7419
                border-radius: 4px
                a 
                    display: block 
                    font-size: 14px
                    line-height: 20px
                    text-align: center
                    cursor: pointer
                    &:nth-child(1)
                        border-bottom: 1px solid #fff
</style>
