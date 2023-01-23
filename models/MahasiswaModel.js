const Model = require("../models/Model");

class MahasiswaModel extends Model {
    getUserByNama = async (table, nama, callback) => {
        let sql = `SELECT * from ${table} WHERE nama = ?`;
        this.db.query(sql, nama, callback);
    }
}

module.exports = MahasiswaModel