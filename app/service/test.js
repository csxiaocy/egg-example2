'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async test() {
    const body = '这里使用了service';
    return body;
  }
}

module.exports = UserService;