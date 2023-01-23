const bcryptjs = require('bcryptjs')
const MahasiswaModel = require('../models/MahasiswaModel')
const Response = require('../models/Response')
const DB_Define = require('../utils/DB_Define')
const Define = require('../utils/Define')
const Helper = require('../utils/Helper')
const jwt = require('jsonwebtoken')



const MahasiswaController = {
   
    signUp: async (req, res) => {
       

        let token = req.headers['x-access-token'] || req.headers['authorization']; 
        token = token.replace(/^Bearer\s+/, "");


        try {
           // const token = req.cookies.token
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            //token validation
            const payload = Helper.verifyJWTtoken(token)
            //set user email in request
           id_auth = payload.id_auth;
            
    
            try {
                const { nama, tempat_lahir, tgl_lahir,id_kampus } = req.body
                if (!nama || !tempat_lahir || !tgl_lahir || !id_kampus) {
                    throw new Error("Enter nama,tempat_lahir,tgl_lahir,id_kampus")
                }
               
                const datasimpan = {
                    nama:nama,
                    tempat_lahir:tempat_lahir,
                    tgl_lahir: tgl_lahir,
                    id_kampus:id_kampus,
                    created_at : Helper.HariIni()
                }
                        new MahasiswaModel().addData("mahasiswa", datasimpan, (err, results) => {
                            if (err) {
                                let response = new Response(true, err.message, err);
                                res.send(response);
                            } else {
                                //get token and set into cookie
                                res.status(200).json(new Response(false, "mahasiswa created successfully", datasimpan))
                            }
                        })//end db
                   
               
            } catch (e) {
                let response = new Response(true, e.message, e);
                res.send(response);
            }
    

        } catch (e) {
            res.status(401).json(new Response(true, e.message, e))
        }
       
    },//end create user.
}

module.exports = MahasiswaController