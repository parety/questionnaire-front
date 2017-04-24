<template>
    <div class="textSimple">
        <h2>
            <div>Q{{index+1}}</div>
            <div>
                <p>{{content.title}}<span v-if="content.required">*</span></p>
            </div>
        </h2>
        <div class="textContainer">
            <textarea rows="4" cols="70" v-model="select.option"></textarea>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['content', 'index', 'select']
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.textSimple
    position : relative
    padding : 10px 20px 10px
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
            span
                color: #ee7419
    .textContainer
        margin-top: 10px
        padding-left : 34px
        textarea 
            padding : 10px
            resize : none
            outline : none
</style>