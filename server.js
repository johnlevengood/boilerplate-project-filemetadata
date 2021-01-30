var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')
var app = express();

var storage = multer.memoryStorage()
var upload = multer({storage: storage})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
    if (req.file) {
        res.status(200).json({
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype
        })
    } else {
        res.status(500).json({error: 'please upload a file first'})
    }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
