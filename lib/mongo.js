const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(`${config.protocol}://${config.user}:${config.password}@${config.target}`, 
{
  dbName: config.database,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose