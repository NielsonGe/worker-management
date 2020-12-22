const config = {
  'development': {
    'BASE_API': 'https://ics.scgecloud.com:28028'
    //'BASE_API': 'http://ics.scgecloud.com'
  },
  'production': {
    'BASE_API': 'https://ics.scg.cn'
  }
}

const getConfig = () => {
  const envStr = process.env.NODE_ENV as string;

  if (envStr == 'production') {
    return config.production;
  }
  else {
    return config.development;
  }
}

function getBaseApi(): string {
  return getConfig().BASE_API;
}

export { getBaseApi }