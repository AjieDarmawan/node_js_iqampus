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
            res.status(401).json(new Response(true, e.message, e))
        }
       
    },//end create user.


    getData: async(req,res)=>{
        let token = req.headers['x-access-token'] || req.headers['authorization']; 
        token = token.replace(/^Bearer\s+/, "");

        // res.json(req.query.id_tahun_ajar);
        // throw new Error('error');

        var pages = req.query.pages;


        if(pages){
            page = pages;
        }else{
            page = 1;
        }

        try {
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            //token validation
            const payload = Helper.verifyJWTtoken(token)
            //set user email in request
            id_auth = payload.id_auth;

            new MahasiswaModel().getPaginateListTotal(res,page,'mahasiswa', "id",(errTotal, resultsTotal) => {

            new MahasiswaModel().getPaginateList(res,page,'mahasiswa', "id",(err, results) => {
                if (err) {
                    let response = new Response(true, err.message, err);
                    res.send(response);
                } else {
   

                   res.status(200).json(Helper.show_data_object_pagination(parseInt(page),Math.ceil(resultsTotal.length/Define.PAGINATE_PAGE_SIZE),resultsTotal.length,results.length,results))
                   //dari=0,hingga=0,totaldata=0,totalhalaman=0,

                }
            })//end db

        })//end db



        } catch (e) {
            res.status(401).json(new Response(true, e.message, e))
        }
    }
}

module.exports = MahasiswaController