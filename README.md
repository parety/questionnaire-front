# questionaire
#### 最近在学习vue，随话说光说不练假把式，于是乎做个小项目。项目来源：http://ife.baidu.com/2016/task/detail?taskId=50, 以此为原型增加了用户登录的功能。

## 技术栈
#### vue+vue-router+vue-resource+express+mongoose
#### 没用使用vuex，仅仅为了保存用户登录信息使用vuex有点大题小做，这里用的是Event Bus

## 项目进度

### 2017-4-20 完成用户的登录与登出
- ### sessionStorage
#### 为了防止登录之后刷新页面导致登陆状态的丢失，利用sessionStorage在登录成功后将登录信心保存至本地，在登出时销毁。

- ### Event Bus
#### 利用eventbus做组件间的通信（传递登录消息等）

- ### 跨域问题
#### 项目使用了webpack的hotreload技术，这时访问后端就会出现跨域的问题，这里有两种办法解决：

1、 使用代理

```
    proxyTable: {
      '/api': {
        target: 'http://localhost:8000/',
        changeOrigin: true
      }
    }
```

2、 开发时在服务端设置允许跨域

```
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
```

### 2017-4-22 完成single、multiple、txt、calendar四个组件的编写，完成了创建问卷页面

### 2017-4-23 完成用户界面

### 2017-4-24 完成答卷功能
#### 这里遇到一个问题：如何避免同一问卷多次回答的问题

```
// 我的办法是将填写过的问题id写入到本地  每次提交时检查本地是否已存在

let userSubmit = JSON.parse(localStorage.getItem('qustionaire')) || []
if (已存在) return
userSubmit.push(questionaireId)
localStorage.setItem('qustionaire', JSON.stringify(userSubmit))

```
### 2017-4-25 引入Echarts，结尾
#### 这里还有一个需要注意的地方，由于vue-router使用的history模式，后端需要做相应的处理

```
var history = require('connect-history-api-fallback')
// 刷新页面时重新定向到index.html  否则会出现资源不存在
app.use(history({
    index: '/index.html'
}))
```

## 安装

```
$ git clone https://github.com/zyl1314/questionnaire-front.git
$ cd questionnaire-front
$ npm install
$ npm run dev
```
#### 注意数据不是mock的，需要安装相应的后端环境,如下

```
$ git clone https://github.com/zyl1314/questionnaire.git
$ cd questionnaire
$ npm install
$ node index
```
#### 记得开启mongoDB

## [线上地址](http://questionaire.duapp.com/)（可以使用test 111111登录）
