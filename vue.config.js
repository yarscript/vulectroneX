const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer : {
        disableHostCheck: false,
        port            : process.env.DEV_SERVER_PORT || 8080,
    },
    pwa       : {
        name: "SinellaTimeTracker",
        // iconPaths: {
        //     favicon32: "img/icons/favicon-32x32.png",
        // },
        themeColor     : "#ffffff00",
        manifestOptions: {
            background_color: "#335eea",
        },
        // workboxOptions: {
        //   swSrc: "dev/sw.js",
        // },
    },
    // target: 'node',
    pages: {
        index: {
            entry   : "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title   : "SinellaTimeTracker",
            chunks  : [ "main", "chunk-vendors", "chunk-common", "index" ],
        },
    },
    chainWebpack(config) {
        config.module.rules.delete("svg");
        config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
        config.module
              .rule("icons")
              .test(/\.svg$/)
              .include.add(resolve("src/assets/icons"))
              .end()
              .use("svg-sprite-loader")
              .loader("svg-sprite-loader")
              .options({
                  symbolId: "icon-[name]",
              })
              .end();
    },
    pluginOptions: {
        // electron-builder
        electronBuilder: {
            nodeIntegration: true,
            // externals: ["@nondanee/unblockneteasemusic", "@njzy/unblockneteasemusic"],
            builderOptions             : {
                productName: "SinellaTimeTracker",
                copyright  : "Copyright © SinellaTimeTracker",
                // compression: "maximum", // 机器好的可以打开，配置压缩，开启后会让 .AppImage 格式的客户端启动缓慢
                asar: true,
                // publish: [
                //     {
                //         provider: "github",
                //         owner: "qier222",
                //         repo: "YesPlayMusic",
                //         vPrefixedTagName: true,
                //         releaseType: "draft",
                //     },
                // ],
                directories: {
                    output: "dist_electron",
                },
                mac        : {
                    target         : [
                        {
                            target: "dmg",
                            arch  : [ "arm64", "x64" ],
                        },
                        {
                            target: "zip",
                            arch  : [ "arm64", "x64" ],
                            // arch: ["universal"]
                        },
                    ],
                    artifactName   : "${productName}-${arch}.${ext}",
                    category       : "public.app-category.documents",
                    darkModeSupport: true,
                },
                win        : {
                    target       : [ "nsis", "portable" ],
                    publisherName: "SinellaTimeTracker",
                    // icon: "build/icons/icon.ico",
                    publish: [ "github" ],
                },
                linux      : {
                    target  : [ "AppImage", "tar.gz", "deb", "rpm", "snap", "pacman" ],
                    category: "Software",
                    // icon: "./build/icon.icns",
                },
                // dmg: {
                //     icon: "build/icons/icon.icns",
                // },
                nsis: {
                    oneClick                          : false,
                    allowToChangeInstallationDirectory: true,
                    perMachine                        : true,
                },
            },
            chainWebpackMainProcess    : (config) => {
                config.plugin("define").tap((args) => {
                    args[0]["IS_ELECTRON"] = true;
                    return args;
                });
            },
            chainWebpackRendererProcess: (config) => {
                // Chain webpack config for electron renderer process only
                // The following example will set IS_ELECTRON to true in your app
                config.plugin("define").tap((args) => {
                    args[0]["IS_ELECTRON"] = true;
                    return args;
                });
            },
            mainProcessFile            : 'src/background.js',
            // mainProcessWatch: ["../netease_api/routes.js"],
            // mainProcessArgs: []
        },
    },
};

