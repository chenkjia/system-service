const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
//一个套装类别数据模型
const SetcategorySchema = new mongoose.Schema({
  name: { type: String }, // 英文名称
  label: { type: String },  // 中文名称
  logo: { type: String },
  picture: { type: String }
});
//创建套装类别Model
const SetcategoryModal = db.model("setcategory", SetcategorySchema);
module.exports = SetcategoryModal