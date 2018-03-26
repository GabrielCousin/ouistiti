const fs = require('fs');
const express = require('express')
const multer = require('multer')
const moment = require('moment')
const app = express()

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, moment().format('YYYYMMDD-HHmmss') + '.jpg')
    }
  }),
  limits: {
    fieldSize: 25 * 1024 * 1024
  }
})

app.set('view engine', 'pug')
app.use('/assets', express.static('public'));

app.get('/', (req, res) => res.render('index', { isDevMode: process.env.ENV === 'dev' }))
app.post('/save', upload.single('photo'), function (req, res) {
  console.log(moment().format('HH:mm:ss'), 'Upload saved')
  res.end('Upload saved');
});

app.listen(3000, () => console.log('Ouistiti 🙈  started on port 3000'))
