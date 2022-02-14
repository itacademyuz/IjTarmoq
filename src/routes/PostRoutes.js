const express = require('express')
const { BlogError } = require('../helpers/BlogErrors')
const { validatePosts } = require('../middlewares/model-validation')
const { Comment } = require('../models/Comment')
const { Post } = require('../models/Post')
const PostRouter = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { Photo } = require('../models/Photo')
const {createPhotos} = require('.././helpers/createPhotos.js')
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new BlogError(`Iltimos faqat rasmlar yuklang`, 405))
        }
        cb(undefined, true)
    }
})

PostRouter.get('/', async(req, res)=>{
    const posts = await Post.findAll({
        include:[
            {
                model: Photo,
                attributes: ['data', 'description']
            }
        ]
    })
    res.render('posts/index', {posts})
})
PostRouter.get('/new', (req, res)=>{
    res.render('posts/new')
})
PostRouter.post('/', upload.array('image'), validatePosts, async(req, res)=>{
    const {post} = req.body
    const {files} = req
    const postData =  Post.build(post)
    await postData.save()
    await createPhotos(files, postData._id)
    res.redirect('/posts')
})

PostRouter.get('/:id/edit', async(req, res)=>{
    const {id} = req.params
    const post = await Post.findByPk(id)
    res.render('posts/edit', {post})
})
PostRouter.get('/:id', async (req, res)=>{
    const {id} = req.params
    const post = await Post.findByPk(id,{
        include:[
            {
               model: Comment,
               attributes: ['_id', 'content', 'createdAt', 'updatedAt'] 
            }
        ]
    })
    if(!post) throw new BlogError(`Postni topa olmadim`, 404)
    const comments = post.dataValues.Comments
    res.render('posts/single', {post, comments})
})

PostRouter.put('/:id', upload.array('image'), validatePosts, async(req, res)=>{
    const {id} = req.params
    const {post} = req.body
    await Post.update({...post}, {where: {_id: id}})
    res.redirect(`/posts/${id}`)
})

PostRouter.delete('/:id', async(req, res)=>{
    const {id} = req.params
    await Post.destroy({where:{
        _id:id
    }})
    res.redirect('/posts')
})

module.exports = {PostRouter}