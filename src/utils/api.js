import { wxRequest, wxUpload } from 'wxRequest';

// 微信的jscode换取sessionKey
const wxJsCode2Session = (params) => wxRequest(params, 'api/login/index');
// 获取小程序的基本设置
const getBaseInfo = (params) => wxRequest(params, 'api/config/index');

export default {
  wxJsCode2Session,
  getBaseInfo,
};
