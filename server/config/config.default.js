'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528019285960_9766';

  // add your config here
  config.middleware = [];

  // 小程序只能存storage，关闭csrf
  config.security = {
    csrf: {
      enable: false
    },
  };
  
  config.wx = {
    
  }
  
  config.mysql = {
    client: {
      host: '0.0.0.0',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: 'sharebook',
    },
    // 所有数据库配置的默认值
    default:{},

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  
  return config;
};
