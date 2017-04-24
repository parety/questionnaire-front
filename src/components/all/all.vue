<template>
    <div class="all">
        <div class="items">
            <table>
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td><router-link :to="{path: `/questionaire/${item.id}`}">{{item.title}}</router-link></td>
                        <td>{{item.createTime | toTime}}</td>      
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store.js'

export default {
    data () {
        return {
            items: []
        }
    },
    mounted () {
        this.$http.get('/api/all')
            .then((data) => {
                if (data.body.code) {
                    bus.$emit('msg', {
                        message: '获取问卷失败，请重试',
                        type: 'fail'
                    })
                } else {
                    this.items = data.body.questionaires
                }
            })
    },
    filters: {
        toTime: function (timeStamp) {
            var date, Y, M, D, h, m, s
            date = new Date(Number(timeStamp))
            Y = date.getFullYear() + '-'
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            D = date.getDate() + ' '
            h = date.getHours() + ':'
            m = date.getMinutes() + ':'
            s = date.getSeconds()
            return (Y + M + D + h + m + s)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.all
    .items
        width : 700px
        border-top : 1px solid #efefef
        margin : 60px auto 0
        table 
            margin-top : 40px
            width : 100%
            font-size : 14px
            thead 
                th 
                    line-height : 30px
                    &:nth-child(1)
                        width : 60% 
                    &:nth-child(2)
                        width : 40%                                         
            tbody 
                background : #fff
                tr 
                    border-bottom : 1px solid #c9c3be
                    &:hover
                        background : #fcf0e5
                    td 
                        line-height : 40px
                        text-align : center
</style>
