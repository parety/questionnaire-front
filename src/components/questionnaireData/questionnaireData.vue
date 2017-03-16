<template>
    <div class="questionnaireContainer">
        <div class="questionnaireHeader">
            <h1>{{title}}</h1>
        </div>
        <div class="questionnaireBody">
            <component v-for="answer in answers" :is="answer.type" :content="answer.answer" :title="answer.title" :index="$index"  track-by="$index"></component>
        </div>
        <div class="questionnaireFooter">
            <a v-link="{path:'/main'}">返回</a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import single from '../dataPanel/singleDataPanel';
import multiple from '../dataPanel/multipleDataPanel';
import text from '../dataPanel/textDataPanel';

export default {
    data() {
        return {
            title : '',
            answers : [
            ]
        };
    },
    created() {
        var id = this.$route.params.id;
        this.$http.get('/api/getAnswer', {params : {
            id : id
        }}).then(function(res){
            var data = res.body;
            this.title = data.title;
            this.answers = data.answers;
        })
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
        a 
            display : block
            margin : 0 auto
            width : 140px
            height : 30px
            text-align : center
            line-height : 30px
            border : 1px solid #aeaeae
            cursor : pointer
</style>
