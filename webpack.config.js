const path = require("path");
const PATHS = {
	app:path.join(__dirname,"./src/main.js"),
	login:path.join(__dirname,"./src/login.js"),
	userManage:path.join(__dirname,"./src/js/userManage/index.js"),
	permissionManage:path.join(__dirname,"./src/js/permissionManage/index.js"),
	build:path.join(__dirname,"dist"),
	publicPath:"/",
};
const webpack = require("webpack");
const extractPlugin = require("extract-text-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const parallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const copyWebpackPlugin  = require("copy-webpack-plugin");


module.exports=function(env,argv){

	    let filename = "";
	    let plugins=[];
		let soucemap="";
		let commonPlugins = [
			new htmlPlugin({
				title: "首页",
				filename:'index.html',
        inject:'body',
        hash:false,
				template:"./src/index.html",
				chunks:["main","vendor","manifest"],//对应关系,main.js对应的是index.html
				//excludeChunks:["login"],//对应关系,main.js对应的是index.html
			}),
			new htmlPlugin({
				title: "登录",
				filename:'login.html',
        inject:'body',
        hash:false,
				template:"./src/login.html",
				chunks:["login","vendor","manifest"],//对应关系,main.js对应的是index.html
				//excludeChunks:["login"],//对应关系,main.js对应的是index.html
			}),
			new htmlPlugin({
				title: "用户管理",
				filename:'userManage.html',
        inject:'body',
        hash:false,
				template:"./src/router/userManage.html",
				chunks:["userManage","vendor","manifest"],//对应关系,main.js对应的是index.html
			}),
			new htmlPlugin({
				title: "权限管理",
				filename:'permissionManage.html',
            inject:'body',
            hash:false,
				template:"./src/router/permissionManage.html",
				chunks:["permissionManage","vendor","manifest"],//对应关系,main.js对应的是index.html
			}),
			new CleanWebpackPlugin(['dist']), //清除打包后的目录
			new extractPlugin({
					filename:"css/[name].css",
					allChunks:true,
					ignoreOrder:true,
					//disable: false,
					disable: env == "development"  //开发环境禁用抽离css,不然不能热更新css,除非用 css-hot-loader,每次改变css,加载所有的css
			}),//抽离出css
			new copyWebpackPlugin([{
				from:__dirname+'/src/assert',//打包的静态资源目录地址
				to:'./assert' //打包到dist下面的public
			}]),//拷贝静态资源到指定的位置，也就是不用编译这个目录下的文件
		];

		if(env == "development"){
		
			let devPlugins = [
				 new webpack.HotModuleReplacementPlugin(),//模块的热替换
  	  	 		 new webpack.NamedModulesPlugin(), //热更新时显示更新的模块的名字，默认是模块的id
			];
			plugins=commonPlugins.concat(devPlugins);
			filename="js/[name].[hash:16].js";
		
			soucemap="evl-source-map";

		
		}else{
			let prodPlugins = [];

			plugins=commonPlugins.concat(prodPlugins);
		//	soucemap="evl-source-map";
			soucemap="#source-map";
			filename = "js/[name].min.js";
		};
   
		return {
			devtool:soucemap,
			entry: {
		//		vendor:"babel-polyfill",
				main: PATHS.app,
				login: PATHS.login,
				userManage: PATHS.userManage,
				permissionManage: PATHS.permissionManage,
			},
			mode:env,
			output: {
				path: PATHS.build,
				filename: filename,
			//	publicPath:PATHS.publicPath,
				chunkFilename: 'js/[name].chunk.js',
			},
			optimization: {
			//	minimize: false,
				runtimeChunk: {//包清单
					name: "manifest"
				},
				splitChunks: { //拆分公共包
					chunks: 'initial', // 必须三选一： "initial" | "all"(默认就是all) | "async"
		      minSize: 0, // 最小尺寸，默认0
		      minChunks: 1, // 最小 chunk ，默认1
		      maxAsyncRequests: 1, // 最大异步请求数， 默认1
		      maxInitialRequests: 1, // 最大初始化请求书，默认1
					cacheGroups: {
						vendor: {//第三方组件
									test: /node_modules/,
					        chunks:"all" ,
					        name: "vendor",
					        priority: 10,
					        enforce: true
						},
					}
				}
			},
			resolve: {
				extensions: ['.js', '.less', '.json',".scss"],
				modules: ['node_modules'],
				alias: { //配置绝对路径的文件名
		            css: path.join(__dirname, 'src/css'),
		            js: path.join(__dirname, 'src/js'),
		            api: path.join(__dirname, 'src/api'),
		            assert: path.join(__dirname, 'src/assert'),
		        },
			},
			devServer: {
		        historyApiFallback: true,
		        contentBase:path.resolve(__dirname,'dist'),
		        quiet: false, //控制台中不输出打包的信息
		        noInfo: false,
		        inline: true, //开启页面自动刷新,
		        hot:true,
		        openPage:"login.html",
		        publicPath:PATHS.publicPath,
		       // stats:'errors-only',
		        lazy: false, //不启动懒加载
		        compress:true,
		        progress: false, //显示打包的进度
		        overlay:{  //把编译的错误显示在浏览器上
		            errors:true,
		            warnings:true,
		        },
		        watchOptions: {
		            aggregateTimeout: 300
		        },
		       // clientLogLevel: "none", // cancel console client log
		        port: '8094', //设置端口号
		        proxy: {
		             '/finemanage': {
		              //  target: 'http://172.16.13.139:8080',
		                target: 'http://localhost:8080',
		                secure: false,
		                changeOrigin:true,
		               /* pathRewrite: {
				          '^/apis': '/'//需要rewrite重写
				        }*/
		            }
		        }
    		},
    		plugins:plugins,
    		module:{
    			rules:[
						{
							test: /.js$/,
							exclude: /node_modules|assert/, // 排除不处理的目录
							include: path.resolve(__dirname, 'src'), // 精确指定要处理的目录
							use: [{
								loader: "babel-loader"
							}]
						},
						{
							test:/.(css|scss)$/,
							exclude:/assert/,
							use:extractPlugin.extract({
								fallback:"style-loader",
								use:[
									{
										loader:"css-loader",
										 options: {
								            sourceMap: true,
								          //  importLoaders:"1",
								           // minimize: true
								          }
									},
									{
										loader:"postcss-loader",
										options: {
            								sourceMap: true
         								 }
									},
									{
										loader:"sass-loader",
										options: {
            								sourceMap: true,
         								 }
									},
								]
							  }),
						},
						{
					      test: /\.(jpg|png|ico|jpeg|gif)$/,
					      exclude: /assert/, // 排除不处理的目录
					      use: [{
					        loader: "url-loader",
					        options: {
					          name: "[name].[ext]",
					          limit:100,
					         /* publicPath: "../images/",
					          outputPath: "images/"*/
					           publicPath: "../img/",
					          outputPath: "img/"
					        }
					      }]
					    }, 
					    {
					      test: /\.(eot|svg|ttf|woff|woff2)$/,
					      exclude:/assert/,
					      use: [{
					        loader: "url-loader",
					        options: {
					         limit:5000,
					          name: "[name].[ext]",
					          publicPath: "../fonts/",
					          outputPath: "fonts/"
					        }
					   	   }]
						}
				]
    		}
		};
}


