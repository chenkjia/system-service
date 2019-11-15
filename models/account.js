const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');
//一个角色模型
const Schema = new mongoose.Schema(Object.assign(CommonSchema, {
  jobNumber: { type: String },  // 工号
  account: { type: String },  // 账号
  password: { type: String },  // 密码
  username: { type: String}, // 姓名
  organizationId: { type: String },  // 所属部门
  roleId: { type: String },  // 角色
  mobile: { type: String },  // 联系电话
  enabled: { type: Boolean },  // 是否启用
  remark: { type: String },  // 备注
}));
//创建角色Model
const Modal = db.model("account", Schema);
module.exports = Modal