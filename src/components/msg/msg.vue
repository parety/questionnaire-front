<template>
    <div class="msg" :style="msg.type=='success' ? success : fail">
        <p>{{msg.message}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['msg'],
    data () {
        return {
            success: {
                background: '#dff0d8',
                color: '#3c763d'
            },
            fail: {
                background: '#f2dede',
                color: '#a94442'
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.msg
    position: absolute
    top: 40px
    left: 0
    width: 100% 
    line-height: 40px
    text-align: center
    font-size: 20px
    color: #fff
</style>