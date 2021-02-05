const mongoose = require("mongoose");

var dedcSchema = new mongoose.Schema();
dedcSchema = {
    user: String,
    redheart: String,
    orangeheart: String,
    greenheart: String,
    heartbroken: String,
    blueheart: String,
    purpleheart: String,
    blackheart: String,
    inrel: String,
    fire: String,
    ffish: String,
    creep: String,
    date: {type: String, default: Date.now()}
};

var dedcModel = mongoose.model('Dedicate', dedcSchema);

module.exports = dedcModel;