<template>
    <div id="app">
        <v-header></v-header>
        <v-msg v-if="msg.message" :msg="msg"></v-msg>
        <v-mask v-if="mask.show" :type="mask.type" :msg="mask.msg"></v-mask>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header'
import msg from './components/msg/msg'
import mask from './components/mask/mask'
import bus from './store.js'

export default {
    data () {
        return {
            msg: {},
            mask: {
                show: false,
                type: '',
                msg: 'msg'
            }
        }
    },
    components: {
        'v-header': header,
        'v-msg': msg,
        'v-mask': mask
    },
    mounted () {
        bus.$on('msg', (msg) => {
            this.msg = msg
            setTimeout(() => {
                this.msg = {}
            }, 2000)
        })
        bus.$on('maskShow', (mask) => {
            this.mask = mask
        })
        bus.$on('maskHidden', () => {
            this.mask.show = false
        })
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
    position: relative
    width : 960px
    min-height : 1000px
    margin : 0 auto 
    padding-bottom : 100px
    background : #efefef
    font-size : 14px
    color : #747474
</style>

