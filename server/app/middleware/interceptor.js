// 这里添加一个中间处理函数，处理微信小程序账号
module.exports = options => {
  return async function interceptor(ctx, next) {
    if(ctx.path == '/' || ctx.path == '/auth/loginByWeixinAction'){
      await next();
      return;
    }
    // 根据token值获取用户id
    ctx.app.token = ctx.header['x-sharebook-token'] || '';
    // 调用helper处理token
    let token = new ctx.helper.Token(ctx);
    ctx.app.userId = await token.getUserId();
    await next();
  };
};