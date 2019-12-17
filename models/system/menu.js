const mongoose = require("mongoose");
const db = require('../../lib/mongo.js');
const CommonSchema = require('../common.js');
//一个菜单模型
const Schema = new mongoose.Schema({
  ...CommonSchema,
  label: { type: String },  // 菜单名称
  type: { type: String },  // 菜单类型
  url: { type: String },  // 菜单路径
  icon: { type: String },  // 菜单图标
  enabled: { type: Boolean },  // 是否启用
  remark: { type: String },  // 备注
});
//创建菜单Model
const Modal = db.model("menu", Schema);
module.exports = Modal