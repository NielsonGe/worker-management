1. npm install后拍照的时候遇到报错，参考这个帖子修改node_module里面的库代码https://github.com/ionic-team/pwa-elements/pull/68/commits/d297224444033628753619481136cb28c827071a
在@ionic/pwa-elements/dist/collection/components/camera/camera.js里面搜索c.fillLightMode.length > 1修改为c.fillLightMode && c.fillLightMode.length > 1

2. npm install后适用jsencrypt的库会提示错误参考这个帖子https://github.com/travist/jsencrypt/issues/94
下载github上的release最新版本“jsencrypt-3.0.0-rc.1”，把lib目录复制到node_module/jsencrypt下，然后把declarations里面的src下index.d.ts, JSEncryptRSAKey.d.ts, JSEncrypt.d.ts复制到node_module/jsencrypt下