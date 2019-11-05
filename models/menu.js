const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');
//一个菜单模型
const MenuSchema = new mongoose.Schema(Object.assign(CommonSchema, {
  label: { type: String },  // 菜单名称
  type: { type: String },  // 菜单类型
  url: { type: String },  // 菜单路径
  icon: { type: String },  // 菜单图标
  enabled: { type: Boolean },  // 是否可见
  remark: { type: String },  // 备注
}));
//创建菜单Model
const PartModal = db.model("menu", MenuSchema);
module.exports = PartModal