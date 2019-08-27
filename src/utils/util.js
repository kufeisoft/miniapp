/**
* 全局方法
* 酷飞软件 https://www.kufeisoft.com
* Rakiy <xux851@gmail.com>
*/
import wepy from 'wepy';
import {USER_SPECICAL_INFO, BASE_INFO} from '../config/constant';

// 判定用户是否已登陆
function doLogin() {
  let pages = getCurrentPages();
  if (pages.length) {
    let currentPage = pages[pages.length - 1]; // 当前页
    // 如果当前页不是登陆页，则跳到登陆页，如果是，则不跳转
    // console.log(currentPage.route);
    if (currentPage.route !== 'pages/user/login') {
      wepy.navigateTo({url: '/pages/user/login'});
    }
  }
}
// 用户实名判定
function doAuth() {
  let user = wepy.getStorageSync(USER_SPECICAL_INFO);
  if (!user) {
    // 未登陆
    this.doLogin();
  }
  // 未绑定
  if (!user.isauth) {
    wepy.navigateTo({url: '/pages/user/bind'});
  }
}
// 是否已认证，是用于某些不用交互的页面用
function isAuth() {
  let user = wepy.getStorageSync(USER_SPECICAL_INFO);
  if (!(user && user.isauth === 1)) {
    this.doAuth();
    return true;
  }
}
// 页面分享
function share(title = '', desc = '', path = '', img = '') {
  let info = wepy.getStorageSync(BASE_INFO);
  return {
    title: title || info['app_title'],
    desc: desc || info['app_desc'],
    path: path || '/pages/index/index',
    imageUrl: img || (info['app_share'] || ''),
  };
}
// 去除空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 获取当前时间
function getCurrentTime(symbol = '-', type = 1) {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return type === 1 ? [y, m, d].join(symbol) + ' ' + [h, f, s].join(':') : [y, m, d].join(symbol);
}

module.exports = {
  doLogin: doLogin,
  doAuth: doAuth,
  isAuth: isAuth,
  share: share,
  getCurrentTime: getCurrentTime,
  trim: trim,
};
