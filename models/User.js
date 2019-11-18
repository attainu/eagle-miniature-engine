const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    default: ''
  },
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  fbTokens: Array,
  facebook: {
    type: String
  },
});

// UserSchema.statics.someMethod = function (userId, cb) {
//   User.findById(userId, function (error, user) {
//     if (error) {
//       return cb(error);
//     }

//     return cb(null, user);
//   });
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;
