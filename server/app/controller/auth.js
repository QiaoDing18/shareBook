const Base = require('./base');
const Util = require('../../utils/util');
const util = new Util();

class AuthController extends Base {
  constructor(props) {
    super(props);
    this.token = new this.ctx.helper.Token(this.ctx);
  }

  async loginByWeixinAction() {
    let token = new this.ctx.helper.Token(this.ctx);
    const ctx = this.ctx;
    const code = ctx.request.body.code;
    const fullUserInfo = ctx.request.body.userOnfo;
    const userInfo = fullUserInfo.userInfo;
    // 获取openid
    const options = {
      method: 'GET',
      contentType: 'json',
      data: {
        grant_type: 'authorization_code',
        js_code: code,
        secret: this.config.wx.secret,
        appid: this.config.wx.appid
      },
      dataType: 'json'
    };
    // 微信提供的api
    const sessionData = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', options);
    
    // 验证openid
    if(!sessionData.data.openid) {
      return this.fail('登录失败1，缺少openid');
    }

    // 验证用户信息完整性（数字签名验证)
    const crypto = require('crypto');
    const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData + sessionData.data.session_key).digest('hex');

    if(fullUserInfo.signature !== sha1) {
      return this.fail('登录失败2，数字验证签名不通过');
    }


    // 根据openid查找用户是否已经注册
    let userMsg = await ctx.service.user.find({openid: sessionData.data.openid});
    if(ctx.helper.isEmty(userMsg)) {
      let result = await ctx.service.user.insert({
        username: userInfo.nickName,
        register_time: parseInt(new Date().getTime() / 1000),
        last_login_time: parseInt(new Date().getTime() / 1000),
        openid: sessionData.data.openid,
        avatar: userInfo.avatarUrl || '',
        gender: userInfo.gender || 1,   // 性别
        // 0：未知，1：男，2:女
      })

      if(result.affectedRows === 1) {
        console.log('插入成功');
      }
      userMsg = {};
      userMsg.id = result.insertId;
    }

    sessionData.data.user_id = userMsg.id;

    // 查询用户信息
    const resultNewUser = await ctx.service.user.find({
      id: userMsg.id
    })

    // 用户数据库中的信息保存
    const newUserInfo = {
      // 头像
      avatar: resultNewUser.avatar,
      // 用户名
      username: resultNewUser.username,
      // 毕业学校
      master_school: resultNewUser.master_school,
      // 专业
      undergraduate: resultNewUser.undergraduate,
      // 微信id
      wechat_id: resultNewUser.wechat_id,
      // 电话
      tel_id: resultNewUser.tel_id,
      // 介绍
      introduce: resultNewUser.introduce,
    }


    // 更新登录信息
    const resultUpdate = await ctx.service.user.update({
      id: userMsg.id,
      last_login_time: parseInt(new Date().getTime() / 1000)
    })

    if(resultUpdate.affectedRows === 1) {
      console.log("更新成功");
    }

    const sessionKey = await this.token.create(sessionData);

    return this.success({
      token: sessionKey,
      userInfo: newUserInfo
    })
  }
}

module.exports = AuthController;