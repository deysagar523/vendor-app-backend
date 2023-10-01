// backend/models/Vendor.js

const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  bankAccountNo: { type: String, required: true },
  bankName: { type: String, required: true },
  addressLine1: String,
  addressLine2: String,
  city: String,
  country: String,
  zipCode: String,
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Vendor", vendorSchema);