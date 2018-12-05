 # ‘小跳蚤’React APP    
 #### [小跳蚤](http://chegi.xyz/)
 ### 功能
 
    注册/登录/浏览跳蚤市场二手货/浏览其他用户在寻求什么样的二手货可以自己提供/发布自己要出手的二手货/发布自己需要什么样的二手货
    
 ### 技术栈相关

    1.React.js 整体程序框架;
    2.React-router 前端页面路由;
    3.axios API 请求；
    4.antd-mobile react UI框架；
    
 ### 后台服务：
  基于node.js + express + mongodb 的 [服务器](https://github.com/qumuchegi/cg2)提供API响应，nginx 用于放置react app静态页面；
 ### 开发工具
  1.create-react-app脚手架，初始化整个react app框架；
  2.通过 npm install 下载各个依赖包，如axios,react-router-dom,questring等；
  3. [antd-mobile](https://mobile.ant.design/index-cn)官方网站用于查找各种UI组件
    
 ### 开发
  1.下载项目到事先创建好的本地文件夹，并且下载依赖包，并且将项目中的api.js文件里的第5行注释掉，第4行取消注释：
     step1: `git clone https://github.com/qumuchegi/xiaotiaozaoapp.git` 
     step2: `npm install` 
     step3: 取消这一行的注释<br> 
     ```javascript
     //let url = "http://localhost:3001" //本地开发是用这一句，对应服务器监听端口改为3001，同时注视掉下一句
     ```
     注释掉这一行<br>
     ```javascript
      let url = "http://chegi.xyz:8080"//因为80已经被nginx占用
     ```
2.再新建一个文件夹，用于放置服务器：
     step3: `git clone https://github.com/qumuchegi/cg2.git`
     step4: 将项目中的 `bin` 的`www`文件里的这一行端口改为`3001`，与前面step3中的操作对应：<br>
     ```javascript
            var port = normalizePort(8080);//记得部署到腾讯云服务器上要改为8080
     ```
3.开始同时运行前后端项目：
     step5: 在前端react app和后台服务器运行中都运行 `npm start` 即可
    
 
 
