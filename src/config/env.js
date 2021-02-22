/*
 * @Author: your name
 * @Date: 2020-01-31 21:51:33
 * @LastEditTime : 2020-02-03 19:37:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\config\env.js
 */

let baseUrl = '';
let baseImgPath;

let loginUrl = 'http://jwtest.zhihuoyueke.cn/#/';
if (process.env.NODE_ENV == 'development') {
     baseUrl = 'http://test.xingxingzhihuo.com.cn/weixin'
}else if(process.env.NODE_ENV == 'production') {
   baseUrl = 'http://test.xingxingzhihuo.com.cn/weixin'
}
export {
	baseUrl,
    baseImgPath,
    loginUrl
}
