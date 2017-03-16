<template>
    <div id="header">
        <span class="mark">?</span>
        <span>问卷调查</span>
        <a v-link="{path:'/main'}">所有问卷</a>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
        };
    }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
#header
    height : 20px
    padding : 10px 0 10px 40px
    font-size : 14px
    line-height : 20px
    background : #ee7419
    span
    a
        display : inline-block
        &:nth-child(1)
            width : 20px
            height : 20px
            border-radius : 10px
            text-align : center
            font-weight : bolder
            color : #ee7419
            background : #fff
        &:nth-child(2)
            color : #fff
            font-weight : bolder
        &:nth-child(3)
            margin-left : 60px
            color : #fff
</style>
