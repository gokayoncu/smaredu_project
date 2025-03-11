const mongoose = require("mongoose");
const Scheema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Scheema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
