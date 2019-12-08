const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');

//一个字典选项模型
const OptionSchema = new mongoose.Schema({
  value: { type: String, unique: true }, // 选项值
  label: String // 选项文字
})
//一个字典模型
const Schema = new mongoose.Schema({
  ...CommonSchema,
  sign: { type: String, unique: true },  // 字典资源标识
  label: { type: String },  // 字典资源名称
  options: [OptionSchema],
  enabled: { type: Boolean }, // 启用状态
  remark: { type: String },  // 备注
});

const Modal = db.model("dictionary", Schema);
module.exports = Modal