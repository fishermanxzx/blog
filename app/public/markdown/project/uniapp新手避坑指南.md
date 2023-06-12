# uniapp新手避坑指南

## 1. 需要提前申请的材料
某些申请需要审核时间，提前申请才不会影响到测试和上线

- 苹果开发者账号

  审核时间：7天左右

  AppStore 搜索 Apple Developer,然后打开Apple Developer，点击账户-注册。

  注册时使用公司账号注册，相关资料由公司填写。

- 微信登录
微信开发后台申请移动应用：

  - 安卓：准备**appid**和**证书指纹**（uniapp云端证书的md5，填写时需要去掉:号）

  - IOS：准备**bundleId**、**universalLinks**

  申请通过后能获得微信提供的appid,在项目的manifest.json中填写即可。

  **苹果应用规定，若使用第三方登录必须同时提供[苹果登录](https://zh.uniapp.dcloud.io/tutorial/app-oauth-apple.html)，不然审核没法通过**
  **[App Store 审核指南](https://developer.apple.com/cn/app-store/review/guidelines/)**

## 2. 安卓需要填写隐私协议
[具体配置查看](https://zh.uniapp.dcloud.io/tutorial/app-privacy-android.html)

## 3. 打包与证书相关（云端打包）

  - 安卓：
    1. 填写appid 即包名
    2. 勾选使用云端证书。如用本地证书，查看 [本地证书生成指南](https://ask.dcloud.net.cn/article/35777)
    3. 勾选打包类型
    4. 勾选打包方式（推荐使用安心打包，自定义基座只能使用传统打包）

  - IOS：
    1. 填写appid 即包名
    2. 填写证书相关，分别开发证书和打包证书。[证书获得与配置](https://ask.dcloud.net.cn/article/152)
    3. 勾选打包类型
    4. 勾选打包方式（推荐使用安心打包，自定义基座只能使用传统打包）

  [安心打包常见问题](https://zh.uniapp.dcloud.io/tutorial/build/SafePack.html)

## 4. 开发注意事项

1. 为了方便在nvue和vue之间自由切换，最好做到以下几点。
  
  - 采用flex布局，并显示指定flex-direction
  - 显示指定box-sizing为border-box

2. vite和typescript的配置文件最好采用默认的文件，因为自定义配置会产生很多问题。这个得等官方修复好再使用。

3. npm安装第三方包时在Hbuilder中安装，不要在vscode中安装。因为像vue这种包都是被Hbuilder改装过的，在别的编辑器安装会覆盖原来的包，导致编译错误。


  
## 5. 调试相关

  - 不要相信模拟器，最好全部上真机调试，因为模拟器上样式会和真机不一样。