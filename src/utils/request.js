/**
* 请求方法
* 酷飞软件 https://www.kufeisoft.com
* alex.xu <xux851@gmail.com>
*/

import wepy from 'wepy';
import util from './util';
import tip from './tip';
import {API_URL} from '../config/app';
import {USER_TOKEN} from '../config/constant';

const API_SECRET_KEY = 'xxx';
const apiUrl = API_URL;
const TIMESTAMP = (new Date()).getTime();

const wxRequest = async(params = {}, url) => {
  tip.loading();
  let token = wepy.getStorageSync(USER_TOKEN), result = '';
  let data = params.query || {};
  // 加入token
  data.token = token;
  // 加入时间戳
  data.timestamp = TIMESTAMP;
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
        } else {
          // 这里写ELSE
          tip.error('出错了');
          return false;
        }
      }
    }
  });
  return result;
};
const wxUpload = async(params = {}, url) => {
  tip.loading();
  let token = wepy.getStorageSync(USER_TOKEN), result = '';
  let data = params.query || {};
  data.token = token;
  data.time = TIMESTAMP;
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
