const { number, required } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   email:{
      type: String,
      required: true
    },
});
//username and passward are automatic store by passport-local-mongoose using plugin

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);