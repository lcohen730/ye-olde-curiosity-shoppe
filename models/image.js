const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    image: {
        type: Buffer,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);