const jwt = require('jsonwebtoken');
const secret = 'FTD#@HBJRR@@gf';

const isEmpty = function(obj){
	if(obj) return false;
	return true;
}

exports.isEmpty = isEmpty;

class Token{
	constructor(ctx){
		this.ctx = ctx;
	}
	async create(userInfo){
		const token = jwt.sign(userInfo, secret);
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

	async getUserId(){
	  const token = this.ctx.app.token;
	  if (!token) {
	    return 0;
	  }
	  const result = await this.parse();
	  if (isEmpty(result) || result.data.user_id <= 0) {
	    return 0;
	  }
	  return result.data.user_id;
	}
}

exports.Token = Token;

//从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数
const timest = function() {
  var tmp = Date.parse( new Date() ).toString();
  tmp = tmp.substr(0,10);
  return tmp;
}

exports.timest = timest;

const halfArr = function(str){
	let arr = str.split(",");
	arr = arr.slice(Math.ceil(arr.length/2)).join(',');
	return arr;
}

exports.halfArr = halfArr;