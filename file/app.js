const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//-----------------------------------multer code starts from here---------------------------------------------------------//


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('Going to Store the Data in Disk');
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      console.log('File name is ',file.fieldname);
      cb(null, file.originalname + '-' + Date.now()+ path.extname(file.originalname));
      console.log(file);
    }
  })
  
  

app.use( multer({ storage: storage }).single('file'));
app.post('/upload',(request, response,next)=>{
  const file = request.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  else{
  console.log('Server Upload ......');
        console.log(response.file);
        response.json({'msg':'File Uploaded ....'});
      }
})

//--------------------------------multer code ended here ------------------------------------------------------------------//
app.listen(3000,()=>{
  console.log('Server Started...');
})
