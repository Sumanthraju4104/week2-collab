const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name must be less than 50 characters long']},
  email: { type: String, required: true, unique: true, lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    } },
  password: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Hashed Password during Registration:', this.password);
  next();  
});

module.exports = mongoose.model('User', userSchema);