const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(`mongodb://${config.user}:${config.password}@${config.target}:${config.port}/lego`, { useNewUrlParser: true });

module.exports = mongoose