<template>
<div class="multiple-user">
    <h2>
        <div>Q{{index+1}}</div>
        <div>
            <p>{{content.title}}</p>
        </div>
    </h2>
    <div class="options">
        <div class="optionItemContainer" v-for="option in content.options" track-by="$index">
            <input class="optionradio" type="checkbox" :name="`question-${index}`" :class="`question-${index}`" :value="option">
            <div class="optionContent">
                <p>{{option}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    props : ['content', 'index'],
    data() {
        return {
        };
    }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
.multiple-user
    position : relative
    padding : 10px 20px 20px
    &:hover
        background : #fdf1e6
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
    .options 
        padding-left : 34px
        .optionItemContainer 
            width : 100% 
            height : 30px 
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
</style>
