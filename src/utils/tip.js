/**
* 提示与加载工具类
* 酷飞软件 https://www.kufeisoft.com
* Alex.xu <xux851@gmail.com>
*/
export default class Tips {
  constructor() {
    this.isLoading = false;
  }
  /**
  * 弹出提示框
  */
  static success(title, duration = 500) {
    wx.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: duration
    });
  }
  /**
  * 弹出确认窗口
  */
  static confirm(text, payload = {resolve: 'resolve', reject: 'reject'}, title = '提示', cancel = true) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: cancel,
        success: res => {
          if (res.confirm) {
            resolve(payload.resolve);
          } else if (res.cancel) {
            reject(payload.reject);
          }
        },
        fail: res => {
          reject(payload.reject);
        }
      });
    });
  }
  /**
   * 提示框
   */
  static toast(title, onHide, icon = 'success', duration = 1000) {
    wx.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: duration,
      success: (res) => {
        if (onHide) onHide();
      }
    });
  }
  /**
  * 警告框
  */
  static alert(title) {
    wx.showToast({
      title: title,
      image: '../../static/images/alert.png',
      mask: true,
      duration: 1500
    });
  }
  /**
  * 错误框
  */
  static error(title, onHide) {
    wx.showToast({
      title: title || '加载错误',
      image: '../../static/images/error.png',
      mask: true,
      duration: 1000,
      success: (res) => {
        if (onHide) onHide();
      }
    });
  }
  /**
  * 弹出加载提示
  */
  static loading(title = '加载中') {
    if (Tips.isLoading) {
      return;
    }
    Tips.isLoading = true;
    wx.showLoading({
      title: title,
      mask: true
    });
  }
  /**
  * 加载完毕
  */
  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false;
      wx.hideLoading();
    }
  }
  static share(title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function(res) {
        Tips.toast('分享成功');
      }
    };
  }
}
/**
*静态变量，是否加载中
*/
Tips.isLoading = false;
