const mongoose = require("mongoose");

mongoose.connect('mongodb://chenkj:44039159@localhost:27017/lego', { useNewUrlParser: true });

module.exports = mongoose