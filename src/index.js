const express = require('express')
const { buildDB } = require('./models/db-architechture/build')
const { Post } = require('./models/Post')
const engine = require('ejs-mate')
const path = require('path')
const methodOverride = require('method-override')
const { validatePosts } = require('./middlewares/model-validation')
const app = express()

buildDB()
app.use(express.urlencoded({extended: true}))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(methodOverride('_method'))

app.get('/', (req, res)=>{
    res.render('index')
})
app.get('/posts', async(req, res)=>{
    const posts = await Post.findAll({})
    res.render('posts/index', {posts})
})
app.get('/posts/new', (req, res)=>{
    res.render('posts/new')
})
app.post('/posts', validatePosts, async(req, res)=>{
    const {post} = req.body
    await Post.create(post)
    res.redirect('/posts')
})

app.get('/posts/:id/edit', async(req, res)=>{
    const {id} = req.params
    const post = await Post.findByPk(id)
    res.render('posts/edit', {post})
})
app.get('/posts/:id', async (req, res)=>{
    const {id} = req.params
    const post = await Post.findByPk(id)
    if(!post) return console.log(`Postni topa olmadim`);
    res.render('posts/single', {post})
})

app.put('/posts/:id', validatePosts, async(req, res)=>{
    const {id} = req.params
    const {post} = req.body
    await Post.update({...post}, {where: {_id: id}})
    res.redirect(`/posts/${id}`)
})

app.delete('/posts/:id', async(req, res)=>{
    const {id} = req.params
    await Post.destroy({where:{
        _id:id
    }})
    res.redirect('/posts')
})

app.use((err, req, res, next)=>{
    const {status=500, message=`No'malum xatolik yuz berdi`} = err
    res.status(status).render('error', {message, status})
})
app.listen(3000, ()=>{
    console.log(`Server PORT 3000da ishga tushdi`);
})