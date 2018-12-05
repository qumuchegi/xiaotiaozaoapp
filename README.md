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
  基于node.js + express + mongodb 的 [服务器](https://github.com/qumuchegi/cg2)提供API响应，nginx 用于放置react app静态页面和转发API请求给express
 ### 开发工具
  1.create-react-app脚手架，初始化整个react app框架；
  2.通过 npm install 下载各个依赖包，如axios,react-router-dom,questring等；
  3. [antd-mobile](https://mobile.ant.design/index-cn)官方网站用于查找各种UI组件
    
 ### 开发
  ##### 1.下载项目到事先创建好的本地文件夹，并且下载依赖包，并且将项目中的api.js文件里的第5行注释掉，第4行取消注释：
  step1: `git clone https://github.com/qumuchegi/xiaotiaozaoapp.git` <br>
  step2: `npm install` <br>
  step3: 取消这一行的注释<br> 
  ```javascript
  //let url = "http://localhost:3001" //本地开发是用这一句，对应服务器监听端口改为3001，同时注视掉下一句
  ```
  注释掉这一行
  ```javascript
  let url = "http://chegi.xyz:8080"//因为80已经被nginx占用
  ```
 ##### 2.再新建一个文件夹，用于放置服务器：<br>
  step3: `git clone https://github.com/qumuchegi/cg2.git`<br>
  step4: 将项目中的 `bin` 的`www`文件里的这一行端口改为`3001`，与前面step3中的操作对应：<br>
  ```javascript
  var port = normalizePort(8080);//记得部署到腾讯云服务器上要改为8080
  ``` 
##### 3.开始同时运行前后端项目：
  step5: 在前端react app和后台服务器运行中都运行 `npm start` 即可
    
 
 
## 部署
   #### React APP ‘小跳蚤’ 及其后端服务开发及部署总结
   
   开发好前端和后端程序后就是部署到服务器上，上线然后就可以用外网访问了。部署需要租一个云服务器 ( 腾讯云CentOS )、一个域名（ chegi.xyz )、FTP 文件上传工具 FileZilla。此处省略买域名和服务器的步骤。主要是Nginx的安装，前端react app 打包后放到 Nginx, 还有云服务器安装 MongoDB 数据库。

   #####    1. 安装node.js 和mongoDB
   由于我买的服务器是腾讯云的CentOS 系统的，所以在安装软件时候用 yum 来安装：`yum install *******`<br>
   安装好 node.js ,就安装 `mongoDB` ,安装这个mongopDB 是花费我时间最多的,因为它的配置很坑！！搜了网上很多安装mongoDB的教程资料，这个是最靠谱的<br>
   [安装mongoDB](https://www.cnblogs.com/flying1819/articles/9035408.html)<br>
   接下来就是安装 `Nginx` . 如果只是为了运行后端的 express 程序，那么有前面的Node.js 和 MongoDB 就可以了，也就是前端运行在本地，而后端在云服务器里运行。为了把前端写好的 React app 打包后放到云服务器上，我在云服务器上安装了 Nginx 。 centos7 安装 Nginx 的教程：<br>
   [安装 Nginx ](https://blog.csdn.net/default7/article/details/56278658)<br>
   ####    通过 Nginx 将 react 初始静态页面响应给浏览器
   安装完 Nginx 就可以把打包好的前端页面放到 Nginx 找得到的地方，当浏览器请求时把页面响应给浏览器：Nginx 装好后前端请求会出现Nginx的初始页面<br>
   这个页面放在云服务器这个目录里 `/usr/share/nginx/html` ，我们可以用 `Filezilla` 查看<br>
   我们可以把自己打包好的react app的 `build` 文件夹放在这里，然后到 `/etc/nginx`（可以用 `whereis nginx.conf` 命令 查看 nginx 配置文件放置的地方 ）目录里找到默认配置文件 `nginx.conf.default` 和 `nginx.conf` 这两个文件，打开编辑 <br>
   `nginx.conf.default` ：里面监听 80的server的 root 原来是 html，改为上面的build,现在 index.html 就是我们 放上去的 build 里的 index.html 了,改完这个文件后还要改 nginx.conf ：把 `/usr/share/nginx/html` 改为 `/usr/share/nginx/build`<br>
经过以上安装和配置后就完了。<br>
当然我们需要启动Nginx.<br>
接下来开始启动 express 程序 ：进入 我们上传到云服务的express程序目录，`npm start` 即可运行：并且前端 URL 输入 http://chegi.xyz, 成功！！！！
 
 ####     通过 Nginx 将前端请求转发给 express：
 现在用外网可以访问我的应用并且能访问 express 的接口了。不过有一个问题就是如果我把本地连接云服务器的命令行界面关掉的话，那么云服务器上的 express 程序也会被关停，那么前端只能访问到应用的登录和注册界面，无法发送API请求。为什么登录和注册界面就能访问到呢？这是因为这两个界面是由云服务器上的 Nginx 提供的，所以得需要配置Nginx ,让它也把前端访问 express 的情求转发给 express ，这样的话即使我们没有在 express 里用 npm start 启动程序， Nginx 也可以把我们的请求发给express，从而解决这个问题。具体办法是在 nginx.conf.default 配置文件里加入下面这段：
 ```nginx
  # 下面是我自己加的，为了让Nginx访问express
     server {
         listen       8070;
         server_name  chegi.xyz/homepage chegi.xyz/login chegi.xyz/register;
         location / {
             proxy_pass http://chegi.xyz:8080;
            }
       }
  ```
意思是让 Nginx 在 8070 端口监听来自前端 `chegi.xyz/homepage` 、`chegi.xyz/login` 、`chegi.xyz/registe`r 这些域名的请求，然后转发给 `http://chegi.xyz:8080` 这个域和端口，也就是 express 监听前端请求的端口。这样当前端发出像这样的 API 请求 `chegi.xyz/homepage:8080` 时，首先接受到请求的是 Nginx ,然后 Nginx 发现 请求中有 `chegi.xyz/homepage` 这个域名，于是将其转发给了 `http://chegi.xyz:8080` 亦即express程序。所以现在即使不连接云服务器 启动 express， 我们也能自由自在的访问 express API 了！！！

   
