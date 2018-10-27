'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540558641927_7744';

  // add your config here
  config.middleware = [];

  // 小程序只能存storage、关闭csrf
  config.security = {
    csrf: {
      enable: false
    },
  };

  config.wx = {
    secret: '',
    appid: ''
  }

  // 数据库配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      // 数据库名
      database: 'sharebook',
    },
    // 所有数据库配置的默认值
    default: {},

    // 是否加载到app上，默认开启
    app: true,
    // 是否加载到agent上，默认关闭
    agent: false
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  return config;
};
