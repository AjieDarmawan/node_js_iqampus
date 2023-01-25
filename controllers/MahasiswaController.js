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
    },




    
    getDataDetail: async(req,res)=>{
        let token = req.headers['x-access-token'] || req.headers['authorization']; 
        token = token.replace(/^Bearer\s+/, "");
       
        

        try {
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            //token validation
            const payload = Helper.verifyJWTtoken(token)
            //set user email in request
            id_auth = payload.id_auth;

            

            const { id } = req.body

          

            new MahasiswaModel().getUserId('mahasiswa', id,(errTotal, results) => {

                res.status(200).json(new Response(false, "sukses", results))

        })//end db


        } catch (e) {
            res.status(401).json(new Response(true, e.message, e))
        }
    },

    upload_berkas: async(req,res)=>{
        let token = req.headers['x-access-token'] || req.headers['authorization']; 
        token = token.replace(/^Bearer\s+/, "");
       
        

        try {
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            //token validation
            const payload = Helper.verifyJWTtoken(token)
            //set user email in request
            id_auth = payload.id_auth;
          //  const { id } = req.body
            
            
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let photo = req.files.photo;
                save_name_photo= Helper.random(100000)+''+photo.name;

                // res.json(save_name_photo);
                // throw new Error("Unauthorized Access");
                //Use the mv() method to place the file in the upload directory (i.e. "uploads")
                photo.mv('./assets/' + save_name_photo);

                const dataupdate = {
                    photo:save_name_photo,
                    // tempat_lahir:tempat_lahir,
                    // tgl_lahir: tgl_lahir,
                    // id_kampus:id_kampus,
                    // created_at : Helper.HariIni()
                }

                new MahasiswaModel().updateData('mahasiswa', dataupdate,id_auth,(errTotal, results) => {

                        res.status(200).json(new Response(false, "sukses"))

                })//end db


                //send response
                // res.send({
                //     status: true,
                //     message: 'File is uploaded',
                //     data: {
                //         name: photo.name,
                //         mimetype: photo.mimetype,
                //         size: photo.size,
                //         save_name_photo:save_name_photo
                //     }
                // });
            }

          

            


        } catch (e) {
            res.status(401).json(new Response(true, e.message, e))
        }
    }










}

module.exports = MahasiswaController