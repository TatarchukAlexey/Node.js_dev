const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// шаблон регистрации юзера
const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
}, {
  timestamps: true
}
);


UserSchema.pre("save", function(next) {  // Для хешування паролю в БД МонгоДБ
  // Документ юзера который сохраняется
  const user = this;
  if (this.isModified("password") || this.isNew) {
    console.log(user);
    console.log(this.isModified);
    console.log(this.isNew);
    //isModified  проверяет или поле значения изменилось - возвращает тру ли фолс
    //isNew - проверяет или это новый документ - возвращает тру ли фолс
    bcrypt.genSalt(12, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

const User = mongoose.model('User', UserSchema)

module.exports = User;