<template>
    <div class="user">
        <div class="createBar" v-if="!items.length">
            <router-link :to="{name: 'create'}">
                <span>+</span>
                <span>新建问卷</span>
            </router-link>            
        </div>
        <div class="items" v-else>
            <router-link class="create" :to="{path:'/create'}">
                <span>+</span>
                <span>新建问卷</span>
            </router-link>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>标题</th>
                        <th>时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items"  :class="{selected : item.selected}">
                        <td><input type="checkbox" v-model="item.selected" /></td>
                        <td>{{item.title}}</td>
                        <td>{{item.createTime | toTime}}</td>
                        <td :class="{active: state[index]=='发布中'}">{{state[index]}}</td>
                        <td>
                            <a v-if="!item.edit" class="cantedit">编辑</a>
                            <router-link v-else :to="{path: `/update/${item.id}`}">编辑</router-link>
                            <a href="javascript::" @click="delOne(item.id, index)">删除</a>
                            <router-link :to="{path: `/data/${item.id}`}" v-if="!item.edit">查看数据</router-link>    
                            <router-link :to="{path: `/check/${item.id}`}" v-else>查看问卷</router-link>    
                        </td>        
                    </tr>
                </tbody>
            </table>
            <p class="deleteAll">
                <label><input type="checkbox"  v-model="allDone">全选</label>
                <a href="javascript::" @click="delAll">删除</a>
            </p>
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
    computed: {
       state () {
            let arr = []
            this.items.forEach((item) => {
               if (item.edit) {
                   arr.push('未发布')
               } else if (new Date().getTime() > item.deadTime) {
                   arr.push('已结束')
               } else {
                   arr.push('发布中')
               }
            })
            return arr
        },
        allDone: {
            get () {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].selected === false) {
                        return false
                    }
                }
                return true
            },
            set (value) {
                this.items.forEach((item) => {
                    item.selected = value
                })
            }
        },
        delId () {
            var arrId = []
            this.items.forEach((item) => {
                if (item.selected) {
                    arrId.push(item.id)
                }
            })
            return arrId
        }
    },
    methods: {
        // 删除一个
        delOne (id, index) {
            this.$http.post('/api/delete', {idArr: [id]})
                .then((data) => {
                    if (data.body.code) {
                        bus.$emit('msg', {
                            message: '删除失败，请重试',
                            type: 'fail'
                        })
                    } else {
                        bus.$emit('msg', {
                            message: '删除成功',
                            type: 'success'
                        })
                        // 删除数据
                        this.items.splice(index, 1)
                    }
                })
        },
        // 全部删除
        delAll () {
            this.$http.post('/api/delete', {idArr: this.delId})
                .then((data) => {
                    if (data.body.code) {
                        bus.$emit('msg', {
                            message: '删除失败，请重试',
                            type: 'fail'
                        })
                    } else {
                        bus.$emit('msg', {
                            message: '删除成功',
                            type: 'success'
                        })
                        // 删除数据
                        for (var i = 0; i < this.items.length; i++) {
                            if (this.items[i].selected) {
                                this.items.splice(i, 1)
                                // 注意这里需要i--
                                i--
                            }
                        }
                    }
                })
        }
    },
    mounted () {
        let id = bus.user.id
        this.$http.get(`/api/getAllByUser?id=${id}`)
            .then((data) => {
                if (data.body.code) {
                    bus.$emit('msg', {
                        message: '获取问卷失败，请重试',
                        type: 'fail'
                    })
                } else {
                    this.items = data.body.items
                    this.items.forEach((item) => {
                        // 响应式添加
                        this.$set(item, 'selected', false)
                    })
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
.user
    .createBar
        margin :100px auto 0
        width : 700px
        height : 200px
        background : #fff
        border-top : 1px solid #fff
        a
            display : block
            width : 120px
            height : 20px
            margin : 85px 0 0 285px
            padding : 5px
            text-align : center
            background : #f07600
            color : #fff
            span
                font-size : 14px
                line-height : 20px
                &:nth-child(1)
                    margin-right : 10px   
    .items
        width : 700px
        border-top : 1px solid #efefef
        margin : 60px auto 0
        .create
            display : block
            float : right
            width : 120px
            height : 20px
            padding : 5px
            text-align : center
            background : #f07600
            color : #fff
            span 
                font-size : 14px
                line-height : 20px
                &:nth-child(1)
                    margin-right : 10px
        table 
            margin-top : 40px
            width : 100%
            font-size : 14px
            thead 
                th 
                    line-height : 30px
                    &:nth-child(1)
                        width : 7% 
                    &:nth-child(2)
                        width : 20% 
                    &:nth-child(3)
                        width : 30% 
                    &:nth-child(4)
                        width : 10%  
                    &:nth-child(5)
                        width : 33%                                           
            tbody 
                background : #fff
                tr 
                    border-bottom : 1px solid #c9c3be
                    &:hover
                        background : #fcf0e5
                    &.selected
                        background : #fcf0e5
                    td 
                        line-height : 40px
                        text-align : center
                        &.active
                            color : #ee7419
                        a 
                            display : inline-block
                            line-height : 20px
                            padding : 2px 6px
                            color : #747474
                            border :   1px solid #c9c3be
                            border-radius : 3px 
                            &.cantedit
                                opacity : 0.6
        .deleteAll
            background : #fff 
            padding : 10px 0 50px 18px
            font-size : 14px
            line-height : 20px
            input 
                margin-right : 6px
            a 
                display : inline-block
                margin-left : 20px
                padding : 0 10px
                border : 1px solid #c9c3be
                border-radius : 3px 
                color : #747474
</style>

