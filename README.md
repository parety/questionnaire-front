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
