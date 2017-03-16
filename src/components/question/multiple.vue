<template>
<div class="multiple">
    <h2>
        <div>Q{{index+1}}</div>
        <div>
            <p v-show='!titleInput' @click="titleInput=true">{{content.title}}</p>
            <input v-else type="text" :value="content.title" @blur="modifyTitle($event)">
        </div>
    </h2>
    <div class="options">
        <div class="optionItemContainer" v-for="option in content.options" track-by="$index">
            <input class="optionradio" type="checkbox" :name="'question-'+index" :value="option">
            <div class="optionContent">
                <p v-show="!optionsInput[$index]" @click="optionsInput.splice($index, 1, true)">{{option}}</p>
                <input v-else type="text" :value="option" @blur="modifyOption($index, $event)">
            </div>
            <div class="optionsDelBtn" @click="deleteOption($index)">
                X
            </div>
        </div>
    </div>
    <div class="direct">
        <span @click="addOption" class="left">添加选项</span>         
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
            titleInput : false,
            optionsInput : []
        };
    },
    created(){
        for(var i=0; i<this.content.options.length; i++){
            this.optionsInput.push(false);
        }
    },
    methods : {
        modifyTitle(ev){
            this.$dispatch('modifytitle', ev.target.value, this.index);
            this.titleInput = false;
        },
        modifyOption(index, ev){
            this.$dispatch('modifyoption', ev.target.value, index, this.index);
            this.optionsInput.splice(index, 1, false);
        },
        deleteOption(index){
            this.optionsInput.splice(index, 1);
            this.$dispatch('deleteOption', this.index, index);
        },        
        addOption(){
            this.optionsInput.push(false);
            this.$dispatch('addOption', this.index);
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
.multiple
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
            height : 30px
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
    .options 
        padding-left : 34px
        .optionItemContainer 
            width : 100% 
            height : 30px 
            &:hover
                .optionsDelBtn
                    display : block
            .optionradio 
                display : block 
                float : left
                width : 4%
                height : 14px
                margin-top : 8px
            .optionContent 
                width : 93% 
                float : left
                height : 30px
                line-height : 30px
                p 
                    width : 100% 
                    height : 100% 
                input 
                    display : block 
                    width : 100% 
                    height : 100%
                    border : none
                    outline : none
            .optionsDelBtn
                display : none
                width : 3% 
                float : left
                height : 30px
                line-height : 30px
                text-align : center
                cursor : pointer
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
