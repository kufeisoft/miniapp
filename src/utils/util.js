/**
* 全局方法
* 酷飞软件 https://www.kufeisoft.com
* Alex.xu <xux851@gmail.com>
*/
import wepy from 'wepy';
import {USER_SPECICAL_INFO, BASE_INFO} from '../config/constant';

// 判定用户是否已登陆
function doLogin() {
  let pages = getCurrentPages();
  if (pages.length) {
    let currentPage = pages[pages.length - 1]; // 当前页
    // 如果当前页不是登陆页，则跳到登陆页，如果是，则不跳转
    console.log(currentPage.route);
    if (currentPage.route !== 'pages/user/login') {
      wepy.navigateTo({url: '/pages/user/login'});
    }
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
module.exports = {
  doLogin: doLogin,
  share: share,
  trim: trim,
};
