// 封装请求响应
const { Controller } = require('egg');
class BaseController extends Controller{
  constructor(props) {
    super(props);
  }
  success(data, status) {
    let result = {
      error: "no error",
      msg: "操作成功",
      status: status || 0,
      result: data
    };
    this.ctx.body = result;
  }
  fail(data, status) {
    let result = {
      error: "error!",
      msg: "操作失败",
      status: status || -1,
      result: data
    };
    this.ctx.body = result;
  }
}

module.exports = BaseController;