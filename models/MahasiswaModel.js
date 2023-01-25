const Model = require("../models/Model");
const Define = require('../utils/Define');
require('dotenv').config();

const pool = require('./config')


class MahasiswaModel extends Model {

    db = pool

    // updateData = (table, obj, callback) => {
    //     let sql = `UPDATE ${table} SET ? WHERE id = ?`;
    //     this.db.query(sql, [obj, obj.id], callback);
    // }


    getUserId = async (table, id, callback) => {
        let sql = `SELECT * from ${table} WHERE id = ?`;
        this.db.query(sql, id, callback);
    }

    getPaginateList = (res,page, table,  order_field, callback) => {

        //page, table, field, value, field2 = "", value2 = -1, order_field, callback
        //implement pagination here later
        const page_size = Define.PAGINATE_PAGE_SIZE;
        let skip = (page - 1) * page_size;

        let sql = "";
        // if (value2 === -1 && field2 === "") {
        //     sql = `SELECT * from ${table}  ORDER BY ?? DESC LIMIT ? OFFSET ? `;
        //     this.db.query(sql, [order_field, page_size, skip], callback);
        // } else {
            sql = `SELECT * from ${table} ORDER BY ?? DESC LIMIT ? OFFSET ? `;
           this.db.query(sql, [order_field, page_size, skip], callback);

            //res.json(skip);
        //}

    }


    getPaginateListTotal = (res,page, table,  order_field, callback) => {

      
        const page_size = Define.PAGINATE_PAGE_SIZE;
        let skip = (page - 1) * page_size;

        let sql = "";
      
            sql = `SELECT * from ${table} ORDER BY ?? DESC  `;
           this.db.query(sql, [order_field, page_size, skip], callback);

          

    }
}

module.exports = MahasiswaModel