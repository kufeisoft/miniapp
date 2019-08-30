/**
* API接口文件
* 酷飞软件 https://www.kufeisoft.com
* Alex.xu <xux851@gmail.com>
*/

import {wxRequest, wxUpload} from './request';

// 微信的jscode换取sessionKey
const wxJsCode2Session = (params) => wxRequest(params, 'api/login/index');
// 上传文件
const upFile = (params) => wxUpload(params, 'api/tool/upload');

export default {
  wxJsCode2Session,
  upFile
};
