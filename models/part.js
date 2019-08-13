const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');
//一个颗粒数据模型
const PartSchema = new mongoose.Schema(Object.assign(CommonSchema, {
  name: { type: String }, // 英文名称
  label: { type: String },  // 中文名称
}));
//创建颗粒Model
const PartModal = db.model("part", PartSchema);
module.exports = PartModal