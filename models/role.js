const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');
//一个角色模型
const Schema = new mongoose.Schema({
  ...CommonSchema,
  label: { type: String },  // 角色名称
  menus: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref : 'menu'
  }],  // 角色
  enabled: { type: Boolean },  // 是否启用
  remark: { type: String },  // 备注
});
//创建角色Model
const Modal = db.model("role", Schema);
module.exports = Modal