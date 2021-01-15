module.exports = {

    publicPath: process.env.NODE_ENV === "production" ? "/realnameh5/" : ".",
    
    filenameHashing: true,

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.extractComments = true
            config.optimization.minimizer[0].options.uglifyOptions = {output:{comments:false}}
        }

    },

    // configureWebpack: {
    //     //重点
    //     output: {
    //         // 输出重构 打包编译后的js文件名称,添加时间戳.
          
    //         filename: `js/[name].${process.env.npm_package_version}.js`,
    //         chunkFilename: `js/[name].${process.env.npm_package_version}.js`,
    //     },
    // },
    css: {
        //重点.
        extract: {
            // 打包后css文件名称添加时间戳
            filename: `css/[name].${process.env.npm_package_version}.css`,
            chunkFilename: `css/[name].${process.env.npm_package_version}.css`,
        },
    },
    devServer: {
        port: 9528,
        https: true,
        proxy: {
            "/v1/service/v1/ocr/idcard": {
                target: "https://webapi.xfyun.cn",
                changeOrigin: true,
                secure: false,
            },
            '/api/v1.0/':{
              target: 'https://ics.scgecloud.com:28028',
              changeOrigin: true,
              secure: false
            }
        },
    },
    transpileDependencies: ["vue-router", "@ionic/vue", "cache-loader", "vue-i18n"],
    productionSourceMap: false
};
