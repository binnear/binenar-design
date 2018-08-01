# MALL-WEB 万科在线家商城web端（react多页面）

## 快速开始

```sh
npm i
npm run dev
```

## 已添加框架插件说明

```sh

antd-ui   已作按需打包处理
lodash    已作按需打包处理
axios     AJAX请求
mock      前端假数据
pcss      pcss为模块化样式，请勿以普通样式引用，若要使用常规样式请于当前组件目录新建*.less文件。如非必要，请尽量使用css Module

注：如需添加框架或插件，请添加后运行 npm run build 查看打包后的体积，若体积过大请慎重考虑是否必须引入!

```

## 目录说明

```sh
mall-web
├── app                                 开发目录
│   └── component                       颗粒组件存放路径
│   └── page                            页面组件存放路径
│   └── public
│       └── css                         初始化样式表存放路径(此表目前使用手动移动到生产目录，后缀使用当前版本号作为缓存替换的触发点,若编辑此文件,请修改对应的版本号)
│       └── imgs                        图片存放路径
│       └── js
│           └── axios                   接口拦截处理
│           └── extra                   常规js，可放入常规配置，公共方式
│           └── mock                    假数据
├── config                              配置目录
│   ├── webpack                         webpack配置目录
│   │   └── webpack.base.conf.js        基本配置信息
│   │   └── webpack.com.conf.js         title, keyword, description生成配置
│   │   └── webpack.dev.conf.js         开发配置
│   │   └── webpack.entry.conf.js       入口js信息配置
│   │   └── webpack.file.conf.js        输出目录配置
│   │   └── webpack.file.move.js        手动移动文件配置
│   │   └── webpack.html.conf.js        html生成配置
│   │   └── webpack.prod.conf.js        生产配置
│   ├── entry.conf.js                   入口js生成配置
│   └── page.conf.js                    页面信息配置  注：在app/page目录下，每添加一个页面，必须在这里配置添加页面的信息
├── dist                                生产环境打包目录
│   └── css
│   └── js
│   └── resource
│   └── favicon.ico
│   └── *.html
├── entry                               入口js文件保存目录
│   └── *.js
├── node_modules
├── .babelrc
├── index.html                          页面*.html的生成模板
├── package-lock.json
├── package.json
├── postcss.config.js
└── README.md

```