module.exports = mongoose => {
    var userSchema = new mongoose.Schema({
        //id: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phoneNumber: String
    });
    var user = mongoose.model('users', userSchema);

    return user;
}