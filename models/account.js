const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
//一个角色模型
const Schema = new mongoose.Schema(Object.assign(CommonSchema, {
  jobNumber: { type: String, unique: true },  // 工号
  username: { type: String, unique: true },  // 账号
  password: { type: String },  // 密码
  fullname: { type: String }, // 姓名
  photo: { type: Array }, // 照片
  organizationId: { type: String },  // 所属部门
  roleId: { type: String },  // 角色
  mobile: { type: String },  // 联系电话
  enabled: { type: Boolean },  // 是否启用
  remark: { type: String },  // 备注
}));

Schema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

Schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

//创建角色Model
const Modal = db.model("account", Schema);
module.exports = Modal