const Service = require('egg').Service;

class CollectService extends Service{
	async getByUID(courseID){
		const {app} = this;
		const result = await app.mysql.get('collect', {user_id: app.userId, course_id: courseID})
		return result;
	}

	async selectByUID(){
		const result = await this.app.mysql.select('collect', {
			where: {user_id: this.app.userId}
		});
		return result;
	}

	async insert(data){
		const result = await this.app.mysql.insert('collect', data);
		return result;
	}

	async delete(id){
		const result = await this.app.mysql.delete('collect', {
		  	id: id,
		}); 
		return result;
	}

	async listMyCollect(){
		const {app} = this;
		const result = await app.mysql.query('select * from course left join collect on course.id=collect.course_id where collect.user_id='+app.userId+';');
		return result;
	}

	async listMyCollectRange(page, size){
		const {app} = this;
		const result = await app.mysql.query('select collect.course_id,course.title,course.publish from course left join collect on course.id=collect.course_id where collect.user_id='+app.userId+' LIMIT '+(page-1)*size+','+size);
		return result;
	}
}

module.exports = CollectService;