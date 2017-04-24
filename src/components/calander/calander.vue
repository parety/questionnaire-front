<template>
    <div class="calanderContainer">
        <div class="calanderHeader">
            <span>
                <select v-model="year">
                    <option v-for="i in 20">{{2010+i}}</option> 
                </select> 
                年
            </span>
            <span>
                <select v-model="month">
                    <option v-for="i in 12">{{1+i}}</option> 
                </select> 
                月
             </span>
        </div>
        <div class="calanderWeek">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
        </div> 
        <div class="calanderDate">
            <span @click="selectDate(i+1)" class="date" v-for="i in dayNum">{{1+i}}</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store.js'

export default {
    data () {
        return {
            year: 0,
            month: 0
        }
    },
    created () {
        this.year = new Date().getFullYear()
        this.month = new Date().getMonth() + 1
    },
    computed: {
        dayNum () {
            var date = new Date()
            date.setYear(this.year)
            date.setMonth(this.month)
            date.setDate(0)
            return date.getDate()
        },
        startWeek () {
            return new Date(`${this.year}-${this.month}-1`).getDay()
        }
    },
    watch: {
        startWeek () {
            this.$el.getElementsByClassName('date')[0].style.marginLeft = this.startWeek * 30 + 'px'
        }
    },
    methods: {
        selectDate (day) {
            var date = `${this.year}-${this.month}-${day}`
            if (new Date(date).getTime() < new Date().getTime()) {
                bus.$emit('msg', {
                    message: '输入日期不能小于当前日期',
                    type: 'fail'
                })
                return
            }
            this.$emit('selectDate', date)
        }
    }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.calanderContainer 
    width : 210px 
    border : 1px solid #ced1d2
    border-radius : 4px 
    .calanderHeader 
        width : 210px
        height : 30px 
        line-height : 30px
        text-align : center 
        span 
            margin : 0 10px 
    .calanderWeek 
        height : 30px  
        border-top : 1px solid #ced1d2
        border-bottom : 1px solid #ced1d2
        font-size : 0px
        span 
            display : inline-block 
            width : 30px 
            height : 30px 
            font-size : 14px
            text-align : center 
            line-height : 30px 
    .calanderDate 
        width : 210px 
        height : 180px 
        padding : 4px 0
        font-size : 0px
        .date 
            display : inline-block
            width : 30px 
            height : 30px
            text-align : center 
            line-height : 30px
            font-size : 14px 
            cursor : pointer
            &:hover 
                background : #ced1d2
                color : #fff
</style>
