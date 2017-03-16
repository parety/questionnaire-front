<template>
<div class="text-user">
    <h2>
        <div>Q{{index+1}}</div>
        <div>
            <p>{{content.title}}</p>
        </div>
    </h2>
    <div class="textContainer">
        <textarea rows="4" cols="50" :name="`question-${index}`" :class="`question-${index}`"></textarea>
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
.text-user
    position : relative
    padding : 10px 20px 20px
    &:hover
        background : #fdf1e6
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
    .textContainer
        padding-left : 34px
        textarea 
            padding : 10px
            resize : none
            outline : none
</style>
