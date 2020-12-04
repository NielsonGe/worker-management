import axios from 'axios';
import { getBaseApi } from '@/Environment';
import { ToastUtils } from '@/utils/ToastUtils';

const service = axios.create({
  baseURL: getBaseApi(),
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const data = response.data;

    if (data.code != '00000') {
      ToastUtils().showError('danger', 2000, data.msg);
      return Promise.reject(new Error(data.msg) || '未知错误');
    }
    else {
      return data;
    }
  },
  error => {
    console.log(error);
    ToastUtils().showError('danger', 2000, error);
    return Promise.reject(error);
  }
)

export default service;