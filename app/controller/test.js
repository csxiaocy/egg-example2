'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const body = this.ctx.body;
    const testService = await this.ctx.service.test.test();
    this.ctx.body = `${body}<br>${testService}<br>这是test页面`;
  }
}

module.exports = TestController;
