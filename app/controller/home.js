'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const body = ctx.body;
    ctx.body = `<br>hi,egg${body}`;
    // throw ctx.helper.createError('error message', ctx.app.errCode.testController.error1);
  }
}

module.exports = HomeController;
