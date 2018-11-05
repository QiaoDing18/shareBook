module.exports = options => {
  return async function interceptor(ctx, next) {
    if(ctx.path == '/' || ctx.path == '/auth/loginByWeixinAction'){

        await next();
        return;
    }
    // 根据token值获取用户id --- 这里没有解决token的获取
    // 在转包时发现这个自定义字段是空的--空的是因为太长了
    ctx.app.token = ctx.header['x-booklist-token'] || '';
    let token = new ctx.helper.Token(ctx);
    ctx.app.userId = await token.getUserId();
    await next();
  };
};
