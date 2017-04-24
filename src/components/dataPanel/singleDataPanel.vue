<template>
<div class="singleDataPanel">
    <h2>
        <div>Q{{index+1}}</div>
        <div>
            <p>{{title}}</p>
        </div>
    </h2>
    <div class="graph" ref='graph'>

    </div>
</div>
</template>

<script type="text/ecmascript-6">
let echarts = require('echarts')

export default {
    props: ['optionNum', 'optionTxt', 'title', 'index'],
    mounted () {
        echarts.init(this.$refs.graph).setOption({
            tooltip: {},
            xAxis: {
                data: this.optionTxt
            },
            yAxis: {
                interval: 1,
                min: 0,
                max: 'dataMax'
            },
            series: [{
                name: '票数',
                type: 'bar',
                data: this.optionNum
            }]
        })
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.singleDataPanel
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
    .graph 
        width : 400px
        height : 200px
        margin : 0 auto
        border : 1px solid #666
</style>
