const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    uuid : { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String },
    createdAt: {
        type: Date,
        "default": Date.now
    },
    updatedAt: {
        type: Date,
        "default": Date.now
    }
});

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };

  UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
  };

  UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
      username: this.username,
      email: this.email,
      id: this.uuid,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
  }

  UsersSchema.methods.toAuthJSON = function() {
    return {
      _id: this.uuid,
      username: this.username,
      email: this.email,
      token: this.generateJWT(),
    };
  };

module.exports = mongoose.model('User', UsersSchema);
