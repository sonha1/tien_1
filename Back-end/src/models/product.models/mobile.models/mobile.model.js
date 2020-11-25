const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileSchema = new Schema({
  idProduct: { type: Schema.Types.ObjectId, required: true },
  cpu: { type: String, trim: true },
  cameras: {
    before: { type: String, trim: true },
    after: { type: String, trim: true },
  },
  color: { type: String, trim: true },
  displaySize: { type: String, trim: true },
  operating: { type: String, trim: true },
  disk: { type: String, trim: true },
  ram: { type: String, trim: true },
  pin: { type: String, trim: true },
  catalogs: [String],
  details: Schema.Types.ObjectId,
});

const MobileSchema = mongoose.model('mobile', mobileSchema, 'mobiles');

module.exports = MobileSchema;