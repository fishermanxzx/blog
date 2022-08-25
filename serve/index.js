const express = require('express')
const history = require('connect-history-api-fallback')
const path = require('path')
const httpPort = 80
const app = express()
app.use(history())
app.use(express.static(path.resolve(__dirname,'../app/build')))
app.listen(httpPort,()=>console.log('服务启动成功，监听端口为：',httpPort))
