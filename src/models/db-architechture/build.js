const { connect } = require("../../db/config");
const { Post } = require("../Post");
const buildDB = async(forceOption=false)=>{

    connect(forceOption)
}
module.exports = {buildDB}