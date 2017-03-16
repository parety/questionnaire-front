<template>
<div class="text">
    <h2>
        <div>Q{{index+1}}</div>
        <div>
            <p v-show='!titleInput' @click="titleInput=true">{{content.title}}</p>
            <input v-else type="text" :value="content.title" @blur="modifyTitle($event)">
        </div>
    </h2>
    <div class="textContainer">
        <textarea rows="4" cols="50" :name="'question-'+index"></textarea>
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
    props : ['content', 'index', 'alllen'],
    data() {
        return {
            titleInput : false
        };
    },
    methods : {
        modifyTitle(ev){
            this.$dispatch('modifytitle', ev.target.value, this.index);
            this.titleInput = false;
        },                 
        repeatQuestion(){
            this.$dispatch('repeatQuestion', this.index);
        },
        deleteQuestion(){
            this.$dispatch('deleteQuestion', this.index);
        },
        toDown(){
            this.$dispatch('toDown', this.index);
        },    
        toUp(){
            this.$dispatch('toUp', this.index);
        }    
    }
};

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
                width : 94%
                p 
                    width : 100% 
                input 
                    display : block 
                    width : 100% 
                    height : 100%
                    border : none
                    outline : none
    .textContainer
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
