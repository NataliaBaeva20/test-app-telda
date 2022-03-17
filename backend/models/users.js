const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
  .then(user => {
    if (!user) {
      // пользователь не найден
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }

    // пользователь найден
    return bcrypt.compare(password, user.password)
      .then(matched => {
        if(!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'))
        }
    
        return user;
      });
  })
  
};

module.exports = mongoose.model('user', userSchema);