const db = require('../database/models');

module.exports = {
    getUserById : async (id) => {
        try {
            const user = await db.User.findByPk(id);

            return user
        } catch (error) {
            throw {
                status : error.status || 500,
                message : error.message
            }
        }
    }

 }