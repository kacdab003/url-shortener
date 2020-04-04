const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const linkSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    route:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },

})
module.exports = mongoose.model('Link',linkSchema);