const express = require('express');
const routers  = express.Router();
const AuthController = require('../controllers/AuthController');
const csrf_mid = require('../routers/middleware/csrf_mid')



// routers.get('/login',(req,res,next)=>{
//     res.send('tes');
// })

routers.post('/signup', AuthController.signUp)
routers.post('/login', AuthController.login)
routers.post('/logout', AuthController.logout)

routers.use(csrf_mid.csrfProtection)
module.exports = routers;