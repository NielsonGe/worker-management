import service from '@/utils/HttpUtils';
import request from '@/utils/HttpUtils';
import { useStore } from 'vuex';

function ScgApi() {
  const getVerifyCode = async() => {
    return request({
      url: '/api/v1.0/account/getVerifyCode?t=54985569',
      method: 'get'
    });
  }

  const getRsaPublicKey = async() => {
    return request({
      url: '/api/v1.0/account/getRSAPublicKey',
      method: 'get'
    });
  }

  const loginSystem = async(data: any) => {
    return request({
      url: '/api/v1.0/account/login',
      method: 'post',
      data: data
    })
  }

  const getCurrentUserInfo = async(token: string) => {
    return request({
      url: '/api/v1.0/account/getCurrentUserInfo',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  return {
    getVerifyCode, getRsaPublicKey, loginSystem, getCurrentUserInfo
  }
}

export { ScgApi }