const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');

const md5 = require('../lib/encryption.js');

//一个账号模型
const Schema = new mongoose.Schema({
  ...CommonSchema,
  jobNumber: { type: String },  // 工号
  username: { type: String, unique: true },  // 账号
  password: { type: String },  // 密码
  fullname: { type: String }, // 姓名
  photo: { type: Array }, // 照片
  organizationId: { type: String },  // 所属部门
  roles: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref : 'role'
  }],  // 角色
  mobile: { type: String },  // 联系电话
  enabled: { type: Boolean },  // 是否启用
  remark: { type: String },  // 备注
});

// 修改密码前加密
Schema.pre('updateOne', function(next) {
  const data = this.getUpdate()
  if(data.password) {
    this.setUpdate({ $set: { password: md5(data.password) } })
  }
  next();
});

// 创建账号前加密
Schema.pre('save', function(next) {
  this.password = md5(this.password)
  next();
});

// 对比账号密码
Schema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword === md5(this.password)
};

// 创建账号Model
const Modal = db.model("account", Schema);
module.exports = Modal