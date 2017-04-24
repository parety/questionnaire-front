<template>
    <div class="text">
        <h2>
            <div>Q{{index+1}}</div>
            <div>
                <p v-if='!titleModify' @click="showTitleInput">{{content.title}}</p>
                <input v-else ref="titleInput" type="text" :value="content.title" @blur="modifyTitle($event)">
            </div>
            <div>
                <input type="checkbox" v-model="content.required" @click="changeRequire"> 
                <span>此题是否必填</span>
            </div>
        </h2>
        <div class="textContainer">
            <textarea rows="4" cols="50"></textarea>
        </div>
        <div class="direct">    
            <span @click="deleteQuestion" class="right">删除</span>
            <span @click="repeatQuestion" class="right">复用</span>
            <span @click="toDown" class="right" v-if="index!==alllen-1">下移</span>
            <span @click="toUp" class="right" v-if="index!==0">上移</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['content', 'index', 'alllen'],
    data () {
        return {
            titleModify: false
        }
    },
    methods: {
        // 显示title输入框
        showTitleInput () {
            this.titleModify = true
            this.$nextTick(() => {
                this.$refs.titleInput.focus()
            })
        },
        // 改变title值
        modifyTitle (ev) {
            this.$emit('modifyQuestionTitle', ev.target.value, this.index)
            this.titleModify = false
        },
        // 删除问题
        deleteQuestion () {
            this.$emit('deleteQuestion', this.index)
        },
        // 复用问题
        repeatQuestion () {
            this.$emit('repeatQuestion', this.index)
        },
        // 下移
        toDown () {
            this.$emit('toDown', this.index)
        },
        // 上移
        toUp () {
            this.$emit('toUp', this.index)
        },
        // 改变是否必选
        changeRequire () {
            this.$emit('changeRequire', this.index)
        }
    }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.text
    position : relative
    padding : 10px 20px 40px
    &:hover
        background : #fdf1e6
        .direct
            display : block
    h2 
        height : 30px
        div 
            float : left
            height : 100%
            font-size : 16px
            line-height : 30px
            &:nth-child(1) 
                width : 6%
            &:nth-child(2)
                width : 70%
                p 
                    width : 100% 
                input 
                    display : block 
                    width : 100% 
                    height : 100%
                    border : none
                    outline : none
            &:nth-child(3)
                width: 24% 
                text-align: right
    .textContainer
        margin-top: 10px
        padding-left : 34px
        textarea 
            padding : 10px
            resize : none
            outline : none
    .direct
        position : absolute
        display : none
        left : 3%
        bottom : 4px
        width : 94% 
        height : 20px
        span 
            cursor : pointer
        .left
            float : left 
        .right 
            float : right
            margin-left : 10px
</style>