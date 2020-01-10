const mongoose = require("mongoose");
const db = require('../../../lib/mongo.js');
const CommonSchema = require('../../common.js');

const Schema = new mongoose.Schema({
  ...CommonSchema,
  enabled: { type: Boolean },
  icon: { type: String },
  label: { type: String },
  type: { type: String },
  sort:{type: Number},
  remark: { type: String }
});
const Modal = db.model("demoDatatablesNormal", Schema);
module.exports = Modal