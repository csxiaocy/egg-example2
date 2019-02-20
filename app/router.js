'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const first = app.middleware.first();
  router.get('/', controller.home.index);
  router.get('/test', first, controller.test.index);
};
