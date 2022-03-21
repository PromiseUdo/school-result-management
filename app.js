const express = require('express')
const path = require('path')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Student = require('./models/users')


global.__basedir = __dirname

//require the routes
const superAdminRoutes = require('./routes/superadmin')
const authRoutes = require('./routes/auth')

//connection with database
mongoose.connect('mongodb://localhost:27017/rms', {
  // mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  // useCreateIndex:true,
  // useUnifiedTopology: true,
  // useFindAndModify:false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error:'))
db.once('open', () => {
  console.log('Database Connected')
})

//create an express application
const app = express()

//enable file upload
app.use(fileUpload({ createParentPath: true }))


app.use(express.json())

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
app.use(cookieParser())


//middleware to use the routes
app.use('/superadmin', superAdminRoutes)
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('auth/signin')
})

app.get('*', (req, res) => {
  res.send('Error 404')
})

let port = process.env.PORT

if (port == null || port == '') {
  port = 3000
}

app.listen(port, () => {
  console.log('Server started on port ' + port)
})
