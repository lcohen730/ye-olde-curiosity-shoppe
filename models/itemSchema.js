const item = require('./item');
const comment = require('./comment');

const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  image: String,
  // image: { type: Schema.Types.ObjectId, ref: 'Image' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 1 },
  info: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
  timestamps: true
});

itemSchema.methods.getRating = function() {
  return this.rating
};

itemSchema.methods.getRatingLeftover = function() {
  return (5 - this.rating)
};

module.exports = itemSchema;