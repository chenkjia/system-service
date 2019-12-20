const mongoose = require("mongoose");
const db = require('../../../lib/mongo.js');
const CommonSchema = require('../../common.js');

const Schema = new mongoose.Schema({
  label: { type: String },
  info: {
    age: { type: Number },
    address: {
      zip: { type: String },
      content: { type: String }
    }
  }
});
const Modal = db.model("demoDatatablesNestedField", Schema);
module.exports = Modal