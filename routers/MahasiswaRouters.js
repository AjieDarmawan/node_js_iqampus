const express = require('express');
const routers  = express.Router();
const MahasiswaController = require('../controllers/MahasiswaController');
const csrf_mid = require('../routers/middleware/csrf_mid')
const auth_mid = require('../routers/middleware/auth_mid')




// routers.get('/login',(req,res,next)=>{
//     res.send('tes');
// })

routers.post('/upload_berkas', MahasiswaController.upload_berkas)
routers.post('/getDataDetail', MahasiswaController.getDataDetail)
routers.post('/signup', MahasiswaController.signUp)
routers.get('/list', MahasiswaController.getData)



routers.use(auth_mid)

module.exports = routers;