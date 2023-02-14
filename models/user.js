// require mongoose
const mongoose = require('mongoose');
// pull Schema class from mongoose to create new schema
const Schema = mongoose.Schema;
// Add the bcrypt library
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6; // 6 is a reasonable value

// create new userSchema
const userSchema = new Schema(
  {
    // name is required
    name: { type: String, required: true },
    email: {
      type: String,
      // creates a unique index in the db that cannot be violated
      unique: true,
      // trims spaces before and after the string before saving
      trim: true,
      // convert string to lowercase before saving
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
  },
  {
    timestamps: true,
    // Even though it's hashed - don't serialize the password
    // when the document is serialized to JSON, transform it and delete the password
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Mongoose pre-save hook (Mongoose middleware) that will hash the password anytime the password has changed:
// before the save, run an async function
userSchema.pre('save', async function (next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema);
