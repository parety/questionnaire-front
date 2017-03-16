<template>
    <div class="indexPage">
        <div class="createBar" v-if="!items.length">
            <a v-link="{path:'/create'}">
                <span>+</span>
                <span>新建问卷</span>
            </a>
        </div>
        <div class="items" v-else>
            <a class="create" v-link="{path:'/create'}">
                <span>+</span>
                <span>新建问卷</span>
            </a>
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
                    <tr @click="item.selected=true" v-for="item in items" :class="{selected : item.selected}">
                        <td><input type="checkbox" v-model="item.selected" /></td>
                        <td>{{item.title}}</td>
                        <td>{{item.createTime | toTime}}</td>
                        <td :class="{active : state[$index]=='发布中'}">{{state[$index]}}</td>
                        <td>
                            <a v-link="{path: (item.edit ? `/edit/${item.id}` : '')}" :class="{cantedit : !item.edit}"  contenteditable="false">编辑</a>
                            <a href="javascript::" @click="showMask=true">删除</a>
                            <a v-if="!item.edit" v-link="{path : `/questionnaireData/${item.id}`}">查看数据</a>    
                            <a v-else v-link="{path : `/questionnaire/${item.id}`}">查看问卷</a>    
                        </td>        
                    </tr>
                </tbody>
            </table>
            <p class="deleteAll">
                <label><input type="checkbox" v-model="allDone">全选</label>
                <a href="javascript::" @click="showMask=true">删除</a>
            </p>
        </div>
        <mask v-show="showMask" v-on:confirmdel="delItem" v-on:canceldel="hiddenMask"></mask>
    </div>
</template>

<script type="text/ecmascript-6">
import mask from '../mask/mask';

export default {
    data() {
        return {
            items : [
            ],
            showMask : false
        };
    },
    computed : {
       state(){
            var arr = []; 
            this.items.forEach(function(item){
               if(item.edit){
                   arr.push('未发布')
               }else if(new Date().getTime() > item.deadline){
                   arr.push('已结束')
               }else{
                   arr.push('发布中')
               }
            })
            return arr;
        },
        allDone : {
            get(){
                for(var i=0; i<this.items.length; i++){
                    if(this.items[i].selected === false){
                        return false;
                    }
                }
                return true;
            },
            set(value){
                this.items.forEach(function(item){
                    item.selected = value;
                })
            }
        }
    },
    created() {
        this.$http.get('/api/getAll').then(function(res){
            var data = res.body;
            var me = this;
            data.forEach(function(item){
                me.items.push({
                    id : item.id,
                    title : item.title,
                    edit : Number(item.edit),
                    createTime : Number(item.createTime),
                    deadline : Number(item.deadline),
                    selected : false
                })
            })
        })
    },
    filters : {
        toTime : function(timeStamp){
            var date,Y,M,D,h,m,s;
            date = new Date(timeStamp);
            Y = date.getFullYear() + '-';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            D = date.getDate() + ' ';
            h = date.getHours() + ':';
            m = date.getMinutes() + ':';
            s = date.getSeconds(); 
            return(Y+M+D+h+m+s);
        }
    },
    methods : {
        deleteItem($index){
            this.items.splice($index, 1);
        },
        delItem(){
            var idArr = []; 
            for(var i=0; i<this.items.length; i++){
                if(this.items[i].selected){
                    idArr.push(this.items[i].id);
                    this.items.splice(i, 1);
                    i--;
                }
            }
            this.showMask = false;

            this.$http.get('/api/delete', { params : { idArr : idArr }});
        },
        hiddenMask(){
            this.showMask = false;
        }
    },
    components : {
        mask
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.indexPage
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
                            color : #68e659
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
