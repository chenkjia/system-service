const mongoose = require("mongoose");
const db = require('../../../lib/mongo.js');
const CommonSchema = require('../../common.js');

const Schema = new mongoose.Schema({
  ...CommonSchema,
  enabled: { type: Boolean },
  icon: { type: String },
  label: { type: String },
  type: { type: String },
  remark: { type: String },
  hasChildren: {type: Boolean},
  sort:{type: Number},
  parentId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref : 'demoDatatablesTree'
  }
});
const Modal = db.model("demoDatatablesTree", Schema);
module.exports = Modal