<template>
    <div class="questionaire">
        <div class="questionaireHeader">
            <h1>{{questionaire.title}}</h1>
        </div>
        <div class="questionaireBody">
            <component v-for="(question,index) in questionaire.questions" :is="question.type" :content="question.content" :select="selectData[index]" :index="index" :key="index"></component>
        </div>
        <div class="questionnaireFooter">
            <span>提交问卷</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store.js'
import single from '../question/singleSimple'
import multiple from '../question/multipleSimple'
import txt from '../question/textSimple'

export default {
    data () {
        return {
            questionaire: {},
            selectData: []
        }
    },
    mounted () {
        this.$http.get(`/api/questionaire/${this.$route.params.id}`)
            .then((data) => {
                if (data.body.code) {
                    bus.$emit('msg', {
                        message: '获取问卷失败，请重试',
                        type: 'fail'
                    })
                } else {
                    this.questionaire = data.body.questionaire
                    // 添加选项映射
                    this.questionaire.questions.forEach((question) => {
                        switch (question.type) {
                            case 'single':
                                this.selectData.push({
                                    option: '',
                                    type: 'single'
                                })
                                break
                            case 'multiple':
                                this.selectData.push({
                                    option: [],
                                    type: 'multiple'
                                })
                                break
                            case 'txt':
                                this.selectData.push({
                                    option: '',
                                    type: 'txt',
                                    required: question.content.required
                                })
                        }
                    })
                }
            })
    },
    components: {
        single,
        multiple,
        txt
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.questionaire
    width : 660px
    padding : 20px
    margin : 40px auto
    background : #fff
    .questionaireHeader
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
    .questionaireBody
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
