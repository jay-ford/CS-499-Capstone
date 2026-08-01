const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define the user schema with validation.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: [254, 'Email address cannot exceed 254 characters'],
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'A valid email address is required'
        ]
    },

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must contain at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },

    hash: { type: String },
    salt: { type: String }
});

// Method to set the password on this record
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Method to compare entered password against stored hash
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// Method to generate a JSON Web Token for the current record
userSchema.methods.generateJWT = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
      },
      process.env.JWT_SECRET,   // SECRET stored in .env file
      { expiresIn: "1h" }       // Token expires an hour from creation
    );
  };

const User = mongoose.model('users', userSchema);
module.exports = User;
