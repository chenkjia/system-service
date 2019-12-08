const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(`mongodb://${config.user}:${config.password}@${config.target}:${config.port}/daxin`, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose