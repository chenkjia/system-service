const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');
//一个颗粒类别数据模型
const PartcategorySchema = new mongoose.Schema(Object.assign(CommonSchema, {
  name: { type: String }, // 英文名称
  label: { type: String },  // 中文名称
}));
//创建颗粒类别Model
const PartcategoryModal = db.model("partcategory", PartcategorySchema);
module.exports = PartcategoryModal