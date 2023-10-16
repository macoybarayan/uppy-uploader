const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const companion = require('@uppy/companion')
const app = require('express')()
var https = require('https');
var http = require('http');

// var privateKey  = fs.readFileSync('../../../ssl/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('../../../ssl/fullchain.pem', 'utf8');

// var credentials = {key: privateKey, cert: certificate};
const DATA_DIR = path.join(__dirname, '../../../temp_files')

app.use(require('cors')({
  origin: true,
//   credentials: true
}))
app.use(require('cookie-parser')())
app.use(require('body-parser').json())
app.use(require('express-session')({
  secret: 'hello planet'
}))

const options = {
  dropbox: {
    key: 'ms7epkp07n2euw3',
    // key: '43rsu15a5z7a186',
    secret: 'r2insw0gpwt6yll'
    // secret: 'ugi79kwlpu47agm'
  },
  drive: {
    key: '786463626102-jb9va6ir0p5kstcl5vi1q3bim4v6ommd.apps.googleusercontent.com',
    secret: 'L8AU1zTsd0wrBYl0Tl4_odzi'
  },
  s3: {
    key: process.env.COMPANION_AWS_KEY,
    secret: process.env.COMPANION_AWS_SECRET,
    bucket: process.env.COMPANION_AWS_BUCKET,
    region: process.env.COMPANION_AWS_REGION,
    endpoint: process.env.COMPANION_AWS_ENDPOINT,
  },
  server: { host: 'dropbox.allrites.com:2053' ,protocol: 'https'},
  filePath: DATA_DIR,
  secret: 'blah blah',
  debug: false
}

// Create the data directory here for the sake of the example.
try {
  fs.accessSync(DATA_DIR)
} catch (err) {
  fs.mkdirSync(DATA_DIR)
}
process.on('exit', () => {
  fs.rmSync(DATA_DIR, { recursive: true, force: true })
})

const { app: companionApp } = companion.app(options)

app.use(companionApp)

const server = app.listen(2053, () => {
  console.log('listening on port 3020')
})


companion.socket(server, options)
