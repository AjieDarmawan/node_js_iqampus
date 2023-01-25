require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Define = require('./Define');
const bcryptjs = require('bcryptjs')
const AuthModel = require('../models/auth/AuthModel')
const Response = require('../models/Response')
const DB_Define = require('../utils/DB_Define')


const Helper = {
    //@get a date after 1 day @return miliseconds
    getExpireDay: (day = 1) => {
        return moment().add(day, Define.DAYS).valueOf();
    },

    tglFormatUser :(tgl_) => {
        var tgl = moment(tgl_).utc().format('DD-MMMM-YYYY');
        return tgl;
      },



    random: (max) => {

        return Math.floor(Math.random() * max);


    },

    HariIni: () => {
        const date = moment().format('LLLL');;
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },

    HariIniTgl: () => {
        const date = moment().format('LLLL');;
        return moment(date).format('YYYY-MM-DD');
    },


    //@return token:String
    getJWTtoken: (id_auth, id_kampus, name, expires) => {

        // new AuthModel().getUserByEmail("users", email, async (err, results) => {
        if (expires) {
            return jwt.sign(
                { id_auth: id_auth, id_kampus: id_kampus, name: name },

                process.env.ACCESS_SECRET,
                { expiresIn: expires });
        } else {
            return jwt.sign({ id_auth: id_auth, id_kampus: id_kampus, name: name }, process.env.ACCESS_SECRET);
        }
        //  })//end dd

    },
    //@return email:String || throw Error
    verifyJWTtoken: (token) => {
        try {
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            const data = jwt.verify(token, process.env.ACCESS_SECRET)

            return data
        } catch (e) {
            throw new Error("Unauthorized Access")
        }
    },
    //

    show_data_object_pagination: (dari = 0, hingga = 0, totaldata = 0, totalhalaman = 0, data) => {

        //dari=0,hingga=0,totaldata=0,totalhalaman=0,data


        return {
            "kode": 001,
            "message": "sukses",
            "pageprop": {
                "dari": dari,
                "hingga": hingga,
                "totalData": totaldata,
                "totalHalaman": totalhalaman
            },
            "listdata": data,
        }


    }
}
module.exports = Helper