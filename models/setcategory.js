const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');
//一个套装类别数据模型
const SetcategorySchema = new mongoose.Schema({
  ...CommonSchema,
  name: { type: String }, // 英文名称
  label: { type: String },  // 中文名称
  logo: [{ name: String, url: String }],
  picture: [{ name: String, url: String }]
});
//创建套装类别Model
const SetcategoryModal = db.model("setcategory", SetcategorySchema);
module.exports = SetcategoryModal