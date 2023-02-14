const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creating a Mongoose Model called Note
// Collection will be called discs
const Note = mongoose.model('Note', notesSchema);

module.exports = Note;
