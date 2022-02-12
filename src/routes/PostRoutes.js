const express = require('express')
const { BlogError } = require('../helpers/BlogErrors')
const { validatePosts } = require('../middlewares/model-validation')
const { Comment } = require('../models/Comment')
const { Post } = require('../models/Post')
const PostRouter = express.Router()

PostRouter.get('/', async(req, res)=>{
    const posts = await Post.findAll({})
    res.render('posts/index', {posts})
})
PostRouter.get('/new', (req, res)=>{
    res.render('posts/new')
})
PostRouter.post('/', validatePosts, async(req, res)=>{
    const {post} = req.body
    await Post.create(post)
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

PostRouter.put('/:id', validatePosts, async(req, res)=>{
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