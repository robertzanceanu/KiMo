// const mongoose = require('mongoose')
//     , Schema = mongoose.Schema
//     , userSchema = new Schema({
//         firstName: String,
//         lastName: String,
//         email: String,
//         password: String,
//         phoneNumber:String
//     })
//     , user = mongoose.model('user',userSchema);
// module.exports = user;

module.exports = mongoose => {
    var userSchema = new mongoose.Schema({
        //id: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phoneNumber:String
    });
    var user = mongoose.model('user', userSchema);

    return user;
}