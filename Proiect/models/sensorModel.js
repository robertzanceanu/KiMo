module.exports = mongoose => {
    var sensorSchema = new mongoose.Schema({
        userId: String,
        kidName: String,
        age: Number,
        adress: String,
        distance: Number
    });
    var sensorKid = mongoose.model('sensorKid', sensorSchema);

    return sensorKid;
}