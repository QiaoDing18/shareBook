const jwt = require(jsonwebtoken);
const secret = 'FTD#@HBJRR@@gf';

const isEmpty = obj => {
  if(obj){
    return false;
  } else {
    return true;
  }
}


// 这里试一下class的写法
class Token {
  constructor(ctx){
    this.ctx = ctx;
  }

  async crate(userInfo) {
    const token = jwt.signn(userInfo, secert);
    return token;
  }

  async parse() {
    if (this.ctx.app.token) {
      try {
        return jwt.verify(this.ctx.app.token, secret);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  async getUserId() {
    if(!this.ctx.app.token) {
      return 0;
    }
    const result = await this.parse();
    if (isEmpty(result) || result.data.user_id <= 0) {
      return 0;
    }
    return result.data.user_id;
  }
}

const timest = () => {
  let tmp = Date.parse( new Date() ).toString();
  tmp = tmp.substr(0, 10);
  return tmp;
}

const halfArr = () => {
  let arr = str.split(",");
  arr = arr.slice(Math.ceil(arr.length/2)).join(',');
  return arr;
}

exports.isEmpty = isEmpty;
exports.Token = Token;
exports.timest = timest;
exports.halfArr = halfArr;
