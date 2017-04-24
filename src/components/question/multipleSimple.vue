<template>
    <div class="multipleSimple">
        <h2>
            <div>Q{{index+1}}</div>
            <div>
                <p>{{content.title}}</p>
            </div>
        </h2>
        <div class="options">
            <div class="optionItemContainer" v-for="(option, index) in content.options" :key="index">
                <input type="checkbox" :value="'option'+index" v-model="select.option">
                <div class="optionContent">
                    <p>{{option}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['content', 'index', 'select']
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.multipleSimple
    position : relative
    padding : 10px 20px 10px
    &:hover
        background : #fdf1e6
    h2 
        height : 30px
        div 
            float: left
            height: 30px
            line-height : 30px
            font-size : 16px
            &:nth-child(1) 
                width : 6%
            &:nth-child(2)
                width : 94%
    .options 
        padding-left : 30px
        .optionItemContainer 
            width : 100% 
            height : 30px 
            input[type=checkbox]
                float: left
                width : 4%
                margin-top: 8px
            .optionContent 
                float: left
                width : 96% 
                height : 30px
                line-height : 30px
</style>