'use strict';

module.exports = options => {
  return async function first(ctx, next) {
    const body = ctx.body || '';
    ctx.body = `${body}<br>这是test中间件`;
    await next();
  }
}