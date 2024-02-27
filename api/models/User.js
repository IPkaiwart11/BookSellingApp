// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     firstName:{type:String},
//     lastName:{type:String},
//     img: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", UserSchema);


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
    firstName: { type: String },
    lastName: { type: String },
    img: { type: String }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("User", UserSchema);
