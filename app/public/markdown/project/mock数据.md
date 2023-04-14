# 还在用mock.js 写模拟数据 ？看看这篇文章。
## mock.js 缺点
- 无法模拟复杂数据
- 需要熟悉语法
- 不是真正的网络请求，无法调试真正的网络状况。

## 搭建自己的mock服务器
优点：
- 使用node语言编写，打破跨语言的尴尬。
- 请求通过真正的网络请求，可以模拟不同的状态码和网络状况。
- 如果有需要，还可以链接数据库
- 模拟数据的灵活度高
- 与项目解构

步骤：
1. npm init -y 
2. npm i express cors body-parse uuid
   - 框架：express 
   - 中间件：cors body-parse 
   - 工具包： uuid 

示例：
```js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import v1Router from "./v1";
const app = express();
const port = 8888;
app.use(
  cors({
    allowedHeaders: ["Content-Type", "authorization"],
  })
);
// content-type pplication/json
app.use(bodyParser.json());
// content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1", v1Router);
app.listen(port, () => {
  console.log(`Mock app listening on port ${port}`);
});
```

目录结构
```css
项目根目录
├── src
│   ├── v1
│   │   ├── user.ts
│   │   └── index.ts
│   └── app.ts
├── .gitignore
├── package.json
└── README.md
```
