/**
 * @author heart
 * @description 校验
 * @Date 2022-02-26
 */
import router from './router';
import nprogress from 'nprogress';

router.beforeEach((to, from, next) => {
  nprogress.start();
  setTimeout(() => {
    nprogress.done();
  }, 100);
  next();
});
