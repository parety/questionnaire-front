<template>
    <div class="indexPageUser">
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
                        <td><a v-link="{path : `/questionnaire/${item.id}`}">{{item.title}}</a></td>
                        <td>{{item.createTime | toTime}}</td>      
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import mask from '../mask/mask';

export default {
    data() {
        return {
            items : [
            ],
        };
    },
    created() {
        this.$http.get('/api/getAll').then(function(res){
            var data = res.body;
            var me = this;
            data.forEach(function(item){
                if(item.edit == 0 && Number(item.deadline) > new Date().getTime()){
                    me.items.push({
                        id : item.id,
                        title : item.title,
                        createTime : Number(item.createTime)
                    })                
                }
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
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.indexPageUser
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
