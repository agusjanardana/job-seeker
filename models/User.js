const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const { isEmail } = require('validator');

const userSchema = new Schema({
   email: {
      type: String,
      required: [true, 'Masukkin Email Dong'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Tolong masukkan email yang valid'],
   },
   password: {
      type: String,
      required: [true, 'Masukkin password dong'],
      minLength: [6, 'Minimal panjang password itu 6 characters'],
   },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
