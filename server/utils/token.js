const jwt = require('jsonwebtoken');
const secret = 'FTD#@HBJRR@@gf';
class Token {
	async create(userInfo){
		const token = jwt.sign(userInfo, secret);
		return token;
	}

	async parse() {
	  if (app.token) {
	    try {
	      return jwt.verify(app.token, secret);
	    } catch (err) {
	      return null;
	    }
	  }
	  return null;
	}

	async verify() {
	  const result = await this.parse();
	  if (think.isEmpty(result)) {
	    return false;
	  }

	  return true;
	}
}
module.export = Token;