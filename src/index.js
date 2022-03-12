const express = require('express')
const { buildDB } = require('./models/db-architechture/build')
const engine = require('ejs-mate')
const path = require('path')
const session = require('express-session');
const methodOverride = require('method-override')
const passport = require('passport');
const { BlogError } = require('./helpers/BlogErrors')
const { PostRouter } = require('./routes/PostRoutes')
const { CommentRouter } = require('./routes/CommentRoutes');
const { UserRouter } = require('./routes/UserRoutes');
const flash = require('connect-flash');
const app = express()
app.use(express.static(path.join(__dirname, '../public')))
buildDB()
app.use(express.urlencoded({extended: true}))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(methodOverride('_method'))

app.use(session({
    secret: "newunsecurekey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    }
}))

app.use(flash());

passport.initialize();
app.use(passport.session());
require('./helpers/auth-local').localConfig(passport)
app.use((req, res, next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user
    next()
})
app.get('/', (req, res)=>{
    res.render('index')
})

app.use('/posts',PostRouter)
app.use(CommentRouter)
app.use(UserRouter)
app.all('*', (req, res, next)=>{
    next(new BlogError('Sahifa topilmadi', 404))
})
app.use((err, req, res, next)=>{
    const {status=500, message=`No'malum xatolik yuz berdi`} = err
    res.status(status).render('error', {message, status})
})
app.listen(3000, ()=>{
    console.log(`Server PORT 3000da ishga tushdi`);
})