const fs = require('fs');
const express = require('express')
const multer = require('multer')
const app = express()

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const now = new Date()
      const [ date ] = now.toJSON().split('T');
      const filename = `${date}-${now.getHours()}${now.getMinutes() + 1}${now.getSeconds()}.jpg`
      cb(null, filename)
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
  const now = new Date()
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`, 'Upload saved')
  res.end('Upload saved')
});

app.listen(3000, () => console.log('Ouistiti 🙈  started on port 3000'))
