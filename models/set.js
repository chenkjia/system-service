const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
//一个套装数据模型
const SetSchema = new mongoose.Schema({
  name: { type: String }, // 英文名称
  label: { type: String },  // 中文名称
  code: { type: String },
  imgs: { type: Array }
});
//创建套装Model
const SetModal = db.model("set", SetSchema);
module.exports = SetModal