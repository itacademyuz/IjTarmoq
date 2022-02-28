const { Photo } = require("../Photo")

const addPhotos = async (photo)=>{
    await Photo.create(photo);
}
const destroyPhotos = async(id)=>{
    await Photo.destroy({where:{_id: id}})
}
module.exports = {
    addPhotos,
    destroyPhotos
}