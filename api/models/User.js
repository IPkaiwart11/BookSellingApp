

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false 
    },
    firstName: { type: String,required: true } ,
    lastName: { type: String,required: true  },
    phoneNumber: {type: Number ,required: true },
    gender: { type: String ,required: true , enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: {type: Date,required: true },
    img: { type: String }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("User", UserSchema);
