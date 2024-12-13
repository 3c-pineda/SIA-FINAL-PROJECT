const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  score: {
    easy: { 
      type: Number, 
      default: 0 
    },
    medium: { 
      type: Number, 
      default: 0 
    },
    hard: { 
      type: Number, 
      default: 0 
    }
  }
});

// Create the model using the schema
const User = mongoose.model('User', UserSchema);

// Export the model so you can use it in other files
module.exports = User;