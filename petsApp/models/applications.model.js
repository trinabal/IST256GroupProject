const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    number: String,
    pet: String
  }, {
    timestamps: true
});
module.exports = mongoose.model('Application', ApplicationSchema);
