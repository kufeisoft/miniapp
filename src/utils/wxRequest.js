/**
* 请求方法
* 酷飞软件 https://www.kufeisoft.com
* Rakiy <xux851@gmail.com>
*/
import wepy from 'wepy';
import util from './util';
import tip from './tip';
import {USER_TOKEN} from '../config/constant';
import {API_URL} from '../config/url';

const API_SECRET_KEY = ''; // 约定的密钥
const apiUrl = API_URL;

const wxRequest = async(params = {}, url) => {
  tip.loading();
  let token = wepy.getStorageSync(USER_TOKEN);
  let result = '';
  let data = params.query || {};
  data.token = token;
  data.timestamp = (new Date()).getTime();
  await wepy.request({
    url: apiUrl + url,
    method: params.method || 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Content-Auth': API_SECRET_KEY,
    },
  }).then((res) => {
    tip.loaded();
    if (res.statusCode !== 200) {
      tip.error('网络连接错误!');
    } else {
      if (res.data.code === 0) {
        result = res.data.data;
      } else {
        if (res.data.code === 1) {
          tip.alert(res.data.msg);
        } else if (res.data.code === -1) {
          // 令牌错误
          tip.error('参数错误,禁止访问!');
        } else if (res.data.code === 2) {
          // 未登陆
          util.doLogin();
        } else if (res.data.code === 3) {
          // 未实名，用于需要实名认证的接口
          tip.error('用户未实名!', util.doAuth());
        }
      }
    }
  });
  return result;
};
const wxUpload = async(params = {}, url) => {
  tip.loading();
  let result = '';
  let data = params.query || {};
  data.token = wepy.getStorageSync(USER_TOKEN);
  data.time = (new Date()).getTime();
  await wepy.uploadFile({
    url: apiUrl + url,
    filePath: params.filepath,
    formData: data,
    header: {
      'Accept': '*/*',
      'Content-Auth': API_SECRET_KEY,
      'Content-Type': 'application/json',
    },
    name: 'file',
  }).then((res) => {
    tip.loaded();
    if (res.statusCode !== 200) {
      tip.error('图片上传失败!');
    } else {
      res.data = JSON.parse(res.data);
      if (parseInt(res.data.code) === 0) {
        result = res.data.data;
      } else {
        tip.alert('发生错误');
      }
    }
  });
  return result;
};

module.exports = {
  wxRequest,
  wxUpload
};
