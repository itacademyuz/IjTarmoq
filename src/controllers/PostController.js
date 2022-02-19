const { Post } = require('../models/Post')
const { Comment } = require('../models/Comment')
const moment = require('moment')
const { Photo } = require('../models/Photo')
const { createPhotos, deletePhotos } = require('../helpers/photoHandler')
const { BlogError } = require('../helpers/BlogErrors')
const showAll = async(req, res)=>{
    const posts = await Post.findAll({
        include:[
            {
                model: Photo,
                attributes: ['data', 'description']
            }
        ]
    })
    res.render('posts/index', {posts})
}

const renderAddPage = (req, res)=>{
    res.render('posts/new')
}

const addNewPost = async(req, res)=>{
    const {post} = req.body
    const {files} = req
    const postData =  Post.build(post)
    await postData.save()
    await createPhotos(files, postData._id)
    res.redirect('/posts')
}
const renderEditPage = async(req, res)=>{
    const {id} = req.params
    const post = await Post.findByPk(id, {
        include: [
            {
                model: Photo,
                attributes: ['_id', 'data', 'description']
            }
        ]
    })
    const photos = post.dataValues.Photos;
    res.render('posts/edit', {post, photos})
}

const showSingle = async (req, res)=>{
    const {id} = req.params
    const post = await Post.findByPk(id,{
        include:[
            {
               model: Comment,
               attributes: ['_id', 'content', 'createdAt', 'updatedAt'] 
            },{
                model: Photo,
                attributes: ["data", "description"]
            }
        ]
    })
    
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
    
    await Post.update({...post}, {where: {_id: id}})
    await createPhotos(files, id)
    await deletePhotos(req.body.deletePhotos)
    res.redirect(`/posts/${id}`)
}

const deletePost = async(req, res)=>{
    const {id} = req.params
    await Post.destroy({where:{
        _id:id
    }})
    res.redirect('/posts')
}
module.exports = {showAll, renderAddPage, addNewPost, renderEditPage, showSingle, updatePost, deletePost}