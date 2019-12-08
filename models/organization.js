const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');
//一个组织模型
const Schema = new mongoose.Schema({
  ...CommonSchema,
  label: { type: String },  // 组织名称
  type: { type: String },  // 组织类型
  enabled: { type: Boolean },  // 是否启用
  remark: { type: String },  // 备注
  parentId: { type: String, default: '' },  // 父级ID
});
//创建组织Model
const Modal = db.model("organization", Schema);
module.exports = Modal