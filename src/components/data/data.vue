<template>
    <div class="data">
        <div class="dataHeader">
            <h1>{{title}}</h1>
        </div>
        <div class="dataBody">
            <component v-for="(optiontext, index) in optionTxt" :is="optiontext.type" :optionNum="optionNum[index].optionNum" :title="optionNum[index].title" :optionTxt="optiontext.content.options" :index="index" :key="index"></component>
        </div>
        <div class="dataFooter">
            <router-link :to="{path: `/user/${ower}`}">返回</router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
 import single from '../dataPanel/singleDataPanel'
 import multiple from '../dataPanel/multipleDataPanel'
 import txt from '../dataPanel/textDataPanel'
 import bus from '../../store.js'

export default {
    data () {
        return {
            ower: '',
            title: '',
            optionNum: [],
            optionTxt: []
        }
    },
    mounted () {
        this.ower = bus.user.id

        let id = this.$route.params.id
        this.$http.get(`/api/questionaire/${id}`)
            .then((res) => {
                if (res.body.code) {
                    bus.$emit('msg', {
                        message: '获取数据失败，请重试',
                        type: 'fail'
                    })
                } else {
                    this.optionTxt = res.body.questionaire.questions
                }
            })
        this.$http.get(`/api/data/${id}`)
            .then((res) => {
                if (res.body.code) {
                    bus.$emit('msg', {
                        message: '获取数据失败，请重试',
                        type: 'fail'
                    })
                } else {
                    let data = res.body.finalData
                    this.title = data.title
                    this.optionNum = data.questionData
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
.data
    width : 660px
    padding : 20px
    margin : 40px auto
    background : #fff
    .dataHeader
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
    .dataBody
        padding : 20px
        border-top : 1px solid #aeaeae
        border-bottom : 1px solid #aeaeae
    .dataFooter
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