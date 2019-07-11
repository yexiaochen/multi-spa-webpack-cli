import { notification } from 'antd';

const env = process.env.NODE_ENV;
const baseURL = APP_CONFIG[env].ip;
// timeout ;
// const controller = new AbortController();
// const signal = controller.signal;
const defaultConfig = {
  credentials: 'include',
  headers: {
    Accept: 'application/json'
  },
  // signal
};
const codeMessage = {
  301: '永久移动',
  302: '临时移动',
  304: '未修改',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '客户端请求中的方法被禁止',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  413: '由于请求的实体过大，服务器无法处理，因此拒绝请求',
  414: '请求的URI过长（URI通常为网址），服务器无法处理',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext
  });
};

export default async function Fetch(url, config) {
  let newUrl = baseURL + url;
  let newConfig = {
    ...defaultConfig,
    ...config
  };
  // const timeoutId = setTimeout(() => controller.abort(), 5000);
  if (
    newConfig.method.toLocaleLowerCase() === 'post' ||
    newConfig.method.toLocaleLowerCase() === 'put' ||
    newConfig.method.toLocaleLowerCase() === 'delete'
  ) {
    if (!(newConfig.body instanceof FormData)) {
      newConfig.headers['Content-Type'] = 'application/json; charset=utf-8';
      newConfig.body = JSON.stringify(newConfig.body);
    }
  }
  try {
    const response = await fetch(newUrl, newConfig);
    // clearTimeout(timeoutId);
    return checkStatus(response).json();
  } catch (error) {
    notification.error({
      message: `请求错误 : ${newUrl}`,
      description: error.message
    });
    throw error;
  }
}
