const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
// const { REG_LINK } = require('../utils/constants.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Имя пользователя',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
