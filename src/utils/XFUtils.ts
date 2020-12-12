import md5 from 'js-md5';
import { Base64 }  from 'js-base64';
import qs from 'qs';
import axios from 'axios';

const APP_ID = '5fc34b50';
const API_KEY = '7112b70f97d3c04165f0328d667ca595';

function XFUtils() {
  const identifyIdCard = async(photoData: string): Promise<any> => {
    if (photoData == undefined || photoData == '' || photoData == null) {
      return Promise.reject(new Error('photo-data-empty'));
    }

    const photoDataArr = photoData.split(',');

    if (photoDataArr.length != 2) {
      return Promise.reject(new Error('photo-data-format-error'));
    }

    const data = {
      'image': photoDataArr[1]
    };

    const dataEncode = qs.stringify(data);

    const curTime = Math.floor((new Date()).getTime() / 1000);

    const param = {
      'engine_type': 'idcard'
    }

    const paramJsonStr = JSON.stringify(param);
    const paramBase64Str = Base64.encode(paramJsonStr);

    const checkSum = md5(API_KEY + curTime + paramBase64Str);

    const config = {
      method: 'post' as const,
      url: '/v1/service/v1/ocr/idcard',
      headers: { 
        'X-Appid': APP_ID, 
        'X-CurTime': curTime + '',
        'X-Param': paramBase64Str,
        'X-CheckSum': checkSum,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : dataEncode
    };
    
    return axios(config);
  }

  return {
    identifyIdCard
  }
}

export { XFUtils }