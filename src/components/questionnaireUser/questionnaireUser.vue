<template>
    <div class="questionnaireContainer">
        <div class="questionnaireHeader">
            <h1>{{title}}</h1>
        </div>
        <div class="questionnaireBody">
            <form>
                <component v-for="question in questionList" :is="question.type" :content="question.content" :index="$index" track-by="$index"></component>
            </form>
        </div>
        <div class="questionnaireFooter">
            <span @click="submit">提交问卷</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import single from '../question/single-user';
import multiple from '../question/multiple-user';
import text from '../question/text-user';

export default {
    data() {
        return {
            id : '',
            title : '',
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
        })
    },
    methods : {
        submit(){
            var data = [],
                me = this;
            this.questionList.forEach(function(item, index){
                var temp = {},
                    type,
                    nodeList = me.$el.getElementsByClassName(`question-${index}`);
                temp.type = type = item.type;
                if(type == 'single'){
                    temp.content = '';
                    for(var i=0; i<nodeList.length; i++){
                        var option = nodeList[i]; 
                        if(option.checked){
                            temp.content = option.value;
                            data.push(temp);
                            break;
                        }
                    }
                }else if(type == 'multiple'){
                    temp.content = [];
                    for(var i=0; i<nodeList.length; i++){
                        var option = nodeList[i]; 
                        if(option.checked){
                            temp.content.push(option.value);   
                        }
                    }   
                    data.push(temp);            
                }else if(type == 'text'){
                    temp.content = '';
                    temp.content = nodeList[0].value;
                    data.push(temp);
                }
            })

            this.$http.get('/api/submit', {
                params : {
                    id : this.id,
                    data : data
                }
            }).then(function(res){
                this.$router.go('/main');
            })
        }
    },
    components : {
        single,
        multiple,
        text
    }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
.questionnaireContainer
    width : 660px
    padding : 20px
    margin : 40px auto
    background : #fff
    .questionnaireHeader
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
    .questionnaireBody
        padding : 20px
        border-top : 1px solid #aeaeae
        border-bottom : 1px solid #aeaeae
    .questionnaireFooter
        padding : 20px 0 
        span 
            display : block
            margin : 0 auto
            width : 140px
            height : 30px
            text-align : center
            line-height : 30px
            border : 1px solid #aeaeae
            cursor : pointer
</style>
