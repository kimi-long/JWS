/*
 * @Author: your name
 * @Date: 2020-01-31 20:57:39
 * @LastEditTime: 2020-02-19 18:36:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import less from 'less'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(ElementUI)
Vue.use(Vant)

import router from './router'
import Promise from "promise-polyfill";
import store from './store'
// import 'swiper/css/swiper.css'

import 'swiper/css/swiper.css' //注意这里

import VueImageSwipe from 'vue-image-swipe'
import 'vue-image-swipe/dist/vue-image-swipe.css'
Vue.use(VueImageSwipe)


import vuePicturePreview from 'vue-picture-preview'

Vue.use(vuePicturePreview)
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)


import './style/common.css'
import './style/bluestyle.css'
import './style/iconfont/iconfont.css' /*引入字体图标*/

if(!window.Promise){
    window.Promise = Promise;
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
