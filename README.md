# multi-spa-webpack-cli
multi-spa-webpack-cli
## 日常吐槽

经过不断的调整和测试，关于 react 的 webpack 配置终于新鲜出炉。本次的重点主要集中在开发环境上，生产环境则是使用 webpack 的 production 默认模式。

本次配置主要有：

1. **eslint+prettier**;

2. **optimization.splitChunks**;

3. **happypack**;

4. **DllReferencePlugin & DllPlugin**;

5. ...

## 文档的重要性

讲真，对于初次接触 webpack 的同学，怕的可能不是 webpack 的配置，而是长长的 package.json。依赖那么多，你怎么就知道需要哪些依赖呢。不开玩笑，我还真知道。
webpack 的依赖主要是一些 loader 和 plugins。我们知道单页面引用被打包后，原有的结构基本上不复存在了。而之前引用的图片或字体资源还按照之前的路径查找，肯定是找不到的。那么我们就需要转换工具（顺便转换资源）—— `url-loader`|`file-loader`。
大多数人写样式时，喜欢使用 css、less、sass。这时也会有对应的工具 `style-loader`, `css-loader`, `less-loader`。
想要使用 JavaScript 新特性或处理兼容性，就用 `babel-loader`。以上这些基本上可以应付一些简单的项目。可实际上呢？

> 我信你个鬼，你这个糟老头坏的很！

看文档啊，看官方介绍啊。本次也是通过看 babel 文档，和一些依赖文档来配置 webpack 的，全程无压力，而且很正宗。所以，文档很重要。

## eslint+prettier

如果时团队合作，代码规范是很重要的。可以通过 eslint+prettier 规范。这两个工具各有侧重点，不过官网也提供了两者结合的方案。详细介绍见官网。我个人不习惯创建太多的配置文件，所以都放在了 package.json 文件中。

```JavaScript
//  webpack.common.js
{
    enforce: "pre",
    test: /\.m?jsx?$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
    options: {
        fix: true,
        cache: true,
        formatter: require("eslint-friendly-formatter"),
    }
},
```

```JSON
"eslintConfig": {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends": [
        "plugin:prettier/recommended"
    ]
},
"prettier": {
    "singleQuote": true,
    "semi": true
},
```

## 开发环境

开发环境没什么好说的了，简单易配置，官网很详细。

```JavaScript
// webpack.dev.js

plugins: {
    //...
    new webpack.HotModuleReplacementPlugin()
},
devtool: "eval-source-map",
devServer: {
contentBase: path.resolve(__dirname, '..', 'dist'),
port: APP_CONFIG.port,
hot: true,
open: true
}

// index.js
// 入口处要配置这些，别忘了。
// 因为有冒泡的机制，所以在顶端加一个就好。
if (module.hot) {
  module.hot.accept('./views/login/index.js', () => {
    render(App) // 渲染应用
  })
}
```

## optimization.splitChunks

这个配置是用来分割包的。在性能优化上，请求数和请求包的大小也是很重要的优化点。请求数量和请求数据大小要控制在合理的范围内。
不过通常情况下，我们会将包分割为内容不变的部分和内容变化的部分。这不仅仅是为了将大的包分割成更小的包，也是为了能够充分利用缓存机制。

```JavaScript
// webpack.common.js
runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
        verdor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'verdors',
            chunks: 'all',
            priority: -10,
        },
        common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            priority: -20,
        }
    }
}
```

## happypack

转换文件算是打包过程中比较耗时的事情，通过 happypack 可以将这件事分摊给多个 node 进程，这样就会大大缩短了打包时间（同理，可以考虑使用 `thread-loader`）。不过进程之间的通信是要开销的，这是一个优化方向，要不要采用，还需要酌情考虑。

```JavaScript
// loader
{
    test: /\.m?jsx?$/,
    exclude: /node_modules/,
    use: 'happypack/loader?id=js',
}
// plugins
new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: [['@babel/preset-env', {
        "useBuiltIns": "usage",
        "corejs": 3
        }], "@babel/preset-react"],
        plugins: ['@babel/transform-runtime',
        "@babel/plugin-proposal-class-properties", [
            "import",
            {
            "libraryName": "antd",
            "style": true
            }
        ]
        ]
    }
    }]
})
```

不喜欢单独的 babel 文件，所以 babel 的配置都在这里了。其实，关于 babel 要配置的内容还是挺多的。不过不要怕，babel 的官方文档有详细说明。

## DllReferencePlugin & DllPlugin

之前也提到过，通常我们会使用 `optimization.splitChunks` 来处理第三方库，将其分割成不变的部分。可是，每次打包的时候都需要重复这一步骤。
这时候我们就想啊，不变的部分打包一次不就可以了么，之后就只打包那些经常变化的部分，这样不就能提高效率了么？是的， `DllReferencePlugin & DllPlugin` 基本上要做的就是这么一回事。所以，我们会针对这两部分做不同的配置。

```JavaScript
// webpack.dll.js
new webpack.DllPlugin({
    context: process.cwd(),
    path: path.join(__dirname, '..', 'dist', 'dll', '[name]-manifest.json'),
    name: '[name]_[hash]'
})
// webpack.common.js
new webpack.DllReferencePlugin({
    context: process.cwd(), 
    manifest: require(path.resolve(__dirname, '..', 'dist', 'dll', "vendor-manifest.json"))
}),
```

## multi-spa-webpack-cli使用说明

`multi-spa-webpack-cli` 已经发布到 npm，只要在 node 环境下安装即可。**一路按 Enter，全部源码都在里面！！！**

```Shell
npm install multi-spa-webpack-cli -g
```

使用步骤如下:

```Shell
# 1. 初始化项目
multi-spa-webpack-cli init spa-project

# 2. 进入文件目录
cd spa-project

# 3. 安装依赖
npm install

# 4. 打包不变的部分
npm run build:dll

# 5. 启动项目（手动打开浏览器：localhost:8090）
npm start
```

webpack 系列：
1. [浅尝 webpack](http://www.yexiaochen.com/%E6%B5%85%E5%B0%9Dwebpack/)
2. [手写webpack脚手架的cli工具](http://www.yexiaochen.com/%E6%89%8B%E5%86%99webpack%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84cli%E5%B7%A5%E5%85%B7/)
3. [webpack开发环境配置](http://www.yexiaochen.com/webpack%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/)
