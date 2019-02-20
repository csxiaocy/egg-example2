/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550567531877_5975';

  // add your middleware config here
  config.middleware = [];

  // egg-syllabus-framework
  config.errCode = {
    APP_ERROR_CODE: '01',
    NOT_REGISTER_ERROR: '0000',
  };
  config.errCatch = {
    responseErrorMsg: true,
  };
  config.response = {
    ignore: [
      '/favicon.ico',
    ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
