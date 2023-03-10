const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const AuthRouters = require('./routers/AuthRouters.js');
const MahasiswaRouters = require('./routers/MahasiswaRouters');


const app = express();
const PORT = process.env.PORT || 1000;

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));


// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// set routing
app.use('/auth',AuthRouters);
app.use('/mhs',MahasiswaRouters);
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));


module.exports = app;