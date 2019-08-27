# 酷飞软件小程序初始框架 基于WEPY

这里是[西安酷飞软件](https://www.kufeisoft.com)用于初始化小程序的初始化框架

## 特点

### 1. 封装了WEPY的常见弹出组件，异步HTTP请求
### 2. 集成了WEUI
### 3. 添加了下拉加载组件

## 目录说明
```bash
commponents   组件目录
config        配置目录
images        图片路径
pages         页面路径 
plugins       插件目录
style         样式目录
utils         组件目录
```

## 使用步骤

### 1. 安装 wepy
本项目基于wepy开发，[参考这里](https://github.com/wepyjs/wepy)
```bash
npm install wepy-cli -g
```

### 2. 下载源代码
```bash
git clone git@github.com:kufeisoft/miniapp.git
```

### 3. 安装开发依赖
```bash
npm install
```

### 4. 编译源代码
```bash
wepy build
```

### 5. 导入至开发者工具

编译完成后会生成`dist`目录，开发者工具本地开发目录指向`dist`目录。

**切记： 取消勾选`项目-->开启ES6转ES5`，否则代码运行报错。**

### 6. 调试方法 
```bash
wepy build --watch
```

### 7. 发布优化,先执行下方命令，再进行发布，会对静态资源进行压缩
```bash
npm run build
```

