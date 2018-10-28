// 复杂数据的处理，比如数据库获取数据，第三方服务调用
const Service = require('egg').Service;
class UserService extends Service {
  async find(data) {
    const result = await this.app.mysql.get('user', data);
    let obj;

    if(result) {
      // id、用户名、头像、专业、毕业学校、微信id、介绍、信用分
      obj = {
        id: result.id,
        username: result.username,
        master_school: result.master_school,
        undergraduate: result.undergraduate,
        wechat_id: result.wechat_id,
        tel_id: result.tel_id,
        credit: result.credit,
        introduce: result.introduce,
        avatar: result.avatar
      };
    } else {
      obj = null;
    }

    return obj;
  }

  // 插入用户
  async insert(data) {
    const result = await this.app.mysql.insert('user', data);
    return result;
  }

  // 更新
  async update(data) {
    const result = await this.app.mysql.update('user', data);
    return result;
  }

  // 读取数据
  async select(data) {
    const result = await this.app.mysql.select('user', data);
    return result;
  }

  // 用微信id查找
  async searchByTelWX(param) {
    const { app } = this;
    const wechat_id = param.wechat_id || '';
    const tel_id = param.tel_id || '';
    const username = param.username || '';

    let str = `select id,wechat_id,username,tel_id,credit from user where wechat_id LIKE '%${wechat_id}%' AND tel_id LIKE '%${tel_id}%' AND username LIKE '%${username}%'`;

    const result = await this.app.mysql.query(str);
    return result;
  }

  // 更新信用分
  async updateCredit(id, credit) {
    const { app } = this;
    const result = await app.mysql.update('user', {
      id: id,
      credit: credit
    });
    return result;
  }
}

module.exports = UserService;