<template>
    <div class="createPage">
        <div class="createHeader">
            <h1 v-if="!titleModify" @click="modifyTitle">{{questionaire.title}}</h1>
            <input v-else @blur="titleModify = false" ref="titleInput" type="text" v-model="questionaire.title" >
        </div>
        <div class="createBody">
            <component v-for="(question,index) in questionaire.questions" :is="question.type" :content="question.content" :index="index" :alllen="questionaire.questions.length" :key="index" @modifyQuestionTitle="modifyQuestionTitle" @modifyOptionTitle="modifyOptionTitle" @deleteOption="deleteOption" @addOption="addOption" @deleteQuestion="deleteQuestion" @repeatQuestion="repeatQuestion" @toDown="toDown" @toUp="toUp"></component>
            <div class="createBtn">
                <div class="questionOption">
                    <span class="icon-cog" @click='createSingle'>单选题</span> 
                    <span class="icon-checkbox-checked" @click='createMultiple'>多选题</span> 
                    <span class="icon-file-text" @click='createText'>文本题</span>
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
                    <calander v-show="calanderShow" @selectDate="selectDate"></calander>
                </div>
            </div>
        </div> 
    </div>
</template>

<script type="text/ecmascript-6">
import bus from '../../store.js'
import single from '../question/single'
import multiple from '../question/multiple'
import txt from '../question/text'
import calander from '../calander/calander'

export default {
    data () {
        return {
            ower: '',
            questionaire: {
                title: '点击输入标题',
                questions: []
            },
            titleModify: false,
            btnTop: 0,
            date: '',
            calanderShow: false
        }
    },
    mounted () {
        this.ower = bus.user.id
        // 发布问卷
        bus.$once('publish', () => {
            this.$http.post('/api/save', {
                ower: this.ower,
                createTime: new Date().getTime(),
                deadTime: new Date(this.date).getTime(),
                // 是否可编辑
                edit: 0,
                questionaire: this.questionaire
            })
            .then((res) => {
                // 发布失败
                if (res.body.code) {
                    bus.$emit('msg', {
                        message: '发布失败，请重试',
                        type: 'fail'
                    })
                // 发布成功
                } else {
                    bus.$emit('msg', {
                        message: '发布成功',
                        type: 'success'
                    })
                    this.$router.push({path: `/user/${this.ower}`})
                }
            })
        })
    },
    methods: {
        // 修改标题
        modifyTitle () {
            this.titleModify = true
            // 需要等到渲染后再获取元素
            this.$nextTick(() => {
                this.$refs.titleInput.focus()
            })
        },
        // 新增单选题
        createSingle () {
            this.questionaire.questions.push({
                type: 'single',
                content: {
                    title: '单选题',
                    options: [
                        '选项1',
                        '选项2'
                    ]
                }
            })
            this.btnTop = 0
        },
        // 新增多选题
        createMultiple () {
            this.questionaire.questions.push({
                type: 'multiple',
                content: {
                    title: '多选题',
                    options: [
                        '选项1',
                        '选项2'
                    ]
                }
            })
            this.btnTop = 0
        },
        // 新增文本题
        createText () {
            this.questionaire.questions.push({
                type: 'txt',
                content: {
                    title: '文本题',
                    required: true
                }
            })
            this.btnTop = 0
        },
        // 修改选项标题
        modifyQuestionTitle (val, indexP) {
            this.questionaire.questions[indexP].content.title = val
        },
        // 修改选项内容
        modifyOptionTitle (val, indexC, indexP) {
            this.questionaire.questions[indexP].content.options.splice(indexC, 1, val)
        },
        // 删除选项
        deleteOption (indexC, indexP) {
            this.questionaire.questions[indexP].content.options.splice(indexC, 1)
        },
        // 增加选项
        addOption (indexP) {
            this.questionaire.questions[indexP].content.options.push('新的选项')
        },
        // 删除问题
        deleteQuestion (indexP) {
            this.questionaire.questions.splice(indexP, 1)
        },
        // 复用问题
        repeatQuestion (indexP) {
            var newObj = JSON.parse(JSON.stringify(this.questionaire.questions[indexP]))
            this.questionaire.questions.splice(indexP + 1, 0, newObj)
        },
        // 问题下移
        toDown (indexP) {
            var temp = this.questionaire.questions.splice(indexP, 1)[0]
            this.questionaire.questions.splice(indexP + 1, 0, temp)
        },
        // 问题上移
        toUp (indexP) {
            var temp = this.questionaire.questions.splice(indexP, 1)[0]
            this.questionaire.questions.splice(indexP - 1, 0, temp)
        },
        // 选择日期
        selectDate (date) {
            this.date = date
            this.calanderShow = false
        },
        // 发布问卷
        publish () {
            if (!this.date) {
                bus.$emit('msg', {
                    message: '请输入截止日期',
                    type: 'fail'
                })
                return
            }
            if (!this.questionaire.questions.length) {
                bus.$emit('msg', {
                    message: '至少创建一个问题吧',
                    type: 'fail'
                })
                return
            }
            bus.$emit('maskShow', {
                show: true,
                type: 'publish',
                msg: `是否发布问卷？<br>(此问卷截止日期为${this.date})`
            })
        },
        // 保存问卷
        save () {
            this.$http.post('/api/save', {
                ower: this.ower,
                createTime: new Date().getTime(),
                deadTime: new Date(this.date).getTime(),
                // 是否可编辑
                edit: 1,
                questionaire: this.questionaire
            })
            .then((res) => {
                // 保存失败
                if (res.body.code) {
                    bus.$emit('msg', {
                        message: '保存失败，请重试',
                        type: 'fail'
                    })
                // 保存成功
                } else {
                    bus.$emit('msg', {
                        message: '保存成功',
                        type: 'success'
                    })
                    this.$router.push({path: `/user/${this.ower}`})
                }
            })
        }
    },
    components: {
        single,
        multiple,
        txt,
        calander
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.createPage
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
            z-index : 999
</style>
