
const moment = require('moment')
const { BlogError } = require('../helpers/BlogErrors')
const { 
    getAllPosts, 
    createPost, 
    findById, 
    findSingleWithComments, 
    alterPost, 
    destroyPost 
} = require('../models/DAL/PostRepository')

const showAll = async(req, res)=>{
    const posts = await getAllPosts();
    res.render('posts/index', {posts})
}

const renderAddPage = (req, res)=>{
    res.render('posts/new')
}

const addNewPost = async(req, res)=>{
    const {post} = req.body
    const {files} = req
    await createPost(post, files, req.user._id)
    res.redirect('/posts')
}
const renderEditPage = async(req, res)=>{
    const {id} = req.params
    const post = await findById(id)
    const photos = post.dataValues.Photos;
    res.render('posts/edit', {post, photos})
}

const showSingle = async (req, res)=>{
    const {id} = req.params
    const post = await findSingleWithComments(id)
    
    if(!post) throw new BlogError(`Postni topa olmadim`, 404)
    
    const comments = post.dataValues.Comments
    const photos = post.dataValues.Photos;
    const createdMoment = moment(post.createdAt).fromNow()
    res.render('posts/single', {post, comments, photos, createdMoment})
}

const updatePost = async(req, res)=>{
    const {id} = req.params
    const {post} = req.body
    const {files} = req    
    await alterPost(id, post, files, req.body.deletePhotos)
    res.redirect(`/posts/${id}`)
}

const deletePost = async(req, res)=>{
    const {id} = req.params
    await destroyPost(id)
    res.redirect('/posts')
}
module.exports = {showAll, renderAddPage, addNewPost, renderEditPage, showSingle, updatePost, deletePost}