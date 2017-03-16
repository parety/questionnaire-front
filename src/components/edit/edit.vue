<template>
    <div id="createContainer">
        <div class="createHeader">
            <h1 @click="headerShow = true" v-show="!headerShow">{{title}}</h1>
            <input @blur="headerShow = false" v-else type="text" v-model="title" >
        </div>
        <div class="createBody">
            <component v-for="question in questionList" :is="question.type" :content="question.content" :index="$index" :alllen="questionList.length"  track-by="$index"></component>
            <div class="createBtn">
                <div class="questionOption">
                    <span @click='createSingle'>单选题</span> 
                    <span @click='createMultiple'>多选题</span> 
                    <span @click='createText'>文本题</span>
                </div>
                <div class="newQuestion" v-bind:style="{ top : btnTop + 'px'}" @click="btnTop = 60">
                    <span>+</span> 
                    <span>添加问题</span>
                </div>
            </div>
        </div>
        <div class="createFooter">
            <div class="footerContainer">
                <div class="calander">
                    <span>问卷截止日期</span>
                    <span @click="calanderShow=true">{{date}}</span> 
                </div>
                <div class="saveGroup">
                    <span @click="save">保存问卷</span>
                    <span @click="publish">发布问卷</span>
                </div>
                <div class="calanderhook">
                    <calander v-show="calanderShow"></calander>
                </div>
            </div>
        </div> 
    </div>
</template>

<script type="text/ecmascript-6">
import single from '../question/single';
import multiple from '../question/multiple';
import text from '../question/text';
import calander from '../calander/calander.vue';

export default {
    data() {
        return {
            id : '',
            title : '',
            headerShow : false,
            btnTop : 0,
            date : '',
            calanderShow : false,
            questionList : [
            ]
        };
    },
    created() {
        var id = this.$route.params.id;
        this.$http.get('/api/getOne', {params : {
            id : id
        }}).then(function(res){
            var data = res.body[0];
            this.id = data.id;
            this.title = data.title;
            this.questionList = data.questionList;
            
            var date = new Date(Number(data.deadline));
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate();
            this.date = Y + M + D;
        })
    },
    methods : {
        createSingle(){
            this.questionList.push({
                type : 'single',
                content : {
                    title : '单选题',
                    options : [
                        '选项1',
                        '选项2'
                    ]
                }
            })
            this.btnTop = 0;
        },
        createMultiple(){
            this.questionList.push({
                type : 'multiple',
                content : {
                    title : '多选题',
                    options : [
                        '选项1',
                        '选项2'
                    ]
                }
            })
            this.btnTop = 0;
        },
        createText(){
            this.questionList.push({
                type : 'text',
                content : {
                    title : '文本题'
                }
            })
            this.btnTop = 0;
        },
        save(){
            this.$http.get('/api/update', {
                params : {
                    id : this.id,
                    newQuestionnaire : {
                        title : this.title,
                        questionList : this.questionList,
                        deadline : new Date(this.date).getTime(),
                        createTime : new Date().getTime()                   
                    }
                }
            }).then(function(res){
                this.$router.go('/main')
            })
        },
        publish(){
            this.$http.get('/api/update', {
                params : {
                    id : this.id,
                    newQuestionnaire : {
                        edit : 0,
                        title : this.title,
                        questionList : this.questionList,
                        deadline : new Date(this.date).getTime(),
                        createTime : new Date().getTime()                   
                    }
                }
            }).then(function(res){
                this.$router.go('/main')
            })        
        }
    },
    events : {
        modifytitle(val, indexP){
            this.questionList[indexP].content.title = val;
        },
        modifyoption(val, indexC, indexP){
            this.questionList[indexP].content.options.splice(indexC, 1, val);
        },
        deleteOption(indexP, indexC){
            this.questionList[indexP].content.options.splice(indexC, 1);
        },
        addOption(indexP){
             this.questionList[indexP].content.options.push('点击修改');
        },
        repeatQuestion(indexP){
            var newObj = JSON.parse(JSON.stringify(this.questionList[indexP]));
            this.questionList.splice(indexP+1, 0, newObj);
        },
        deleteQuestion(indexP){
            this.questionList.splice(indexP, 1);
        },
        toDown(indexP){
            var temp = this.questionList.splice(indexP, 1)[0];
            this.questionList.splice(indexP+1, 0, temp);
        },
        toUp(indexP){
            var temp = this.questionList.splice(indexP, 1)[0];
            this.questionList.splice(indexP-1, 0, temp);
        },
        selectDate(date){
            this.date = date;
            this.calanderShow = false;
        }
    },
    components : {
        single,
        multiple,
        text,
        calander
    }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
#createContainer
    width : 660px
    padding : 20px
    margin : 40px auto
    background : #fff
    .createHeader
        h1 
            margin : 20px
            height : 40px
            font-size : 18px
            line-height : 40px
            text-align : center
            font-weight : bolder
            color : #65584f
            &:hover 
                background : #fef1e8 
        input 
            dispaly : block 
            width : 94%
            height : 40px
            margin : 20px
            font-size : 18px
            line-height : 40px
            text-align : center
            font-weight : bolder
            border : none
            outline : none           
    .createBody
        padding : 20px
        border-top : 1px solid #aeaeae
        border-bottom : 1px solid #aeaeae
        .createBtn
            position : relative
            height : 60px
            margin-top : 20px
            border : 1px solid #cbcbcb
            .questionOption
                height : 60px
                text-align : center
                span 
                    display : inline-block
                    padding : 4px 10px
                    margin : 19px 10px
                    background : #eeeeee
                    border : 1px solid #cbcbcb
                    cursor : pointer 
            .newQuestion
                position : absolute
                left : 0
                top : 0
                width : 100%
                height : 60px
                font-size : 16px
                text-align : center
                line-height : 60px
                background : #eeeeee
                color : #6e6e6e
                transition : 0.4s
                cursor : pointer
    .footerContainer 
        position : relative
        padding : 20px 60px
        height : 30px
        color : #6a6a6a
        .calander
            float : left
            width : 50% 
            height : 30px
            span 
                display : block 
                float : left               
                &:nth-child(1) 
                    width : 90px 
                    height : 30px
                    line-height : 30px
                &:nth-child(2) 
                    width : 140px
                    height : 28px
                    line-height : 28px
                    border : 1px solid #ced1d2
                    text-indent : 10px
                    cursor : pointer
        .saveGroup 
            float : left
            width : 50% 
            height : 30px 
            line-height : 30px
            text-align : center 
            span 
                padding : 3px 10px 
                margin : 0 10px 
                border-radius : 3px
                cursor : pointer
                &:nth-child(1) 
                    border : 1px solid #ced1d2
                &:nth-child(2) 
                    background : #f07600 
                    color : #fff 
                    border : 1px solid #f07600 
        .calanderhook 
            height : 0 
            width : 0
            position : absolute
            left : 150px 
            top : 60px
            z--index : 999
</style>
