const Joi = require('joi')
const { BlogError } = require('../helpers/BlogErrors')

const validatePosts = (req, res, next)=>{
    const postSchema = Joi.object({
        post: Joi.object({
            title: Joi.string().required(),
            body: Joi.string().required()
        }).required(),
        deletePhotos: Joi.array()
    })
    const {error} = postSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el=>el.message).join()
        throw new BlogError(msg, 400)
    }
    next()
}

module.exports = {validatePosts}