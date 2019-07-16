const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('Going to Store the Data in Disk');
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      console.log('File name is ',file.fieldname);
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
      console.log(path.extname(file.originalname));
    }
  })
  
  

app.use( multer({ storage: storage }).single('file'));
app.post('/upload',(request, response)=>{
  console.log('Server Upload ......');
        response.json({'msg':'File Uploaded ....'});
})
app.listen(1234,()=>{
  console.log('Server Started...');
})