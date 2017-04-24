<template>
    <div>
        <div class="mask">
        </div>
        <div class="info-panel">
            <div class="panel-header">
                <span>提示</span>
                <span @click="cancel">X</span>
            </div>
            <div class="panel-body">
                <p v-html="msg"></p>
                <p>
                    <span @click="confirm">确定</span> 
                    <span @click="cancel">取消</span>                
                </p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store.js'

export default {
    data () {
        return {
        }
    },
    props: ['type', 'msg'],
    methods: {
        confirm () {
            bus.$emit(this.type)
            bus.$emit('maskHidden')
        },
        cancel () {
            bus.$emit('maskHidden')
        }
    }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.mask
    position : fixed
    width : 100% 
    height : 100%
    left : 0
    top : 0
    background : #000
    opacity : 0.6
    z-index : 9
.info-panel
    position : fixed
    width : 240px
    height : 180px
    left : 50% 
    top : 30%
    margin : 0 -150px
    padding : 0px 30px 10px
    background : #fff
    border-radius : 5px
    z-index : 99
    .panel-header
        font-size : 14px
        line-height : 40px
        background : #f7f7f7
        span:nth-child(1)
            font-weight : bolder
        span:nth-child(2)
            float : right
            cursor : pointer
    .panel-body
        p:nth-child(1)
            padding : 20px 0 40px
            line-height: 24px
        p:nth-child(2)
            text-align : center
            span 
                display : inline-block
                margin:0 20px
                padding : 4px 8px
                border-radius : 4px
                cursor : pointer
                &:nth-child(1)
                    background: #f07600
                    border: 1px solid #f07600
                    color : #fff
                &:nth-child(2)
                    border: 1px solid #a7a7a7
</style>
