const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type : String, unique : true},
    password: String,
    role:{type:String, enum:["Boss","Developer","TA"], default : "Developer"}
})

const User = mongoose.model('User',userSchema);

module.exports = User;