const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
