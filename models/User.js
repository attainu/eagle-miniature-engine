const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    facebookId: String
});

UserSchema.statics.someMethod = function(userId, cb) {
  User.findById(userId, function(error, user) {
    if(error) {
      return cb(error);
    }

    return cb(null, user);
  });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
