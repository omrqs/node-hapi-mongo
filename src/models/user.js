import Db from './../libs/mongodb.js';
import Bcrypt from 'bcryptjs';
import Hat from 'hat';

const SALT_LEVEL = 12;

const UserSchema = Db.schema({
  fullname: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  token: { type: String, unique: true, index: true },
  roles: { type: Array }
}, { versionKey: false, timestamps: true })

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.roles = ["ROLE_USER"];
  this.token = Hat();
  this.password = Bcrypt.hashSync(this.password, SALT_LEVEL);

  next();
});

UserSchema.methods.toJson = async function () {
  return {
    id: this._id,
    fullname: this.fullname,
    email: this.email
  };
};

UserSchema.methods.encryptPwd = function (password) {
  return Bcrypt.hashSync(password, SALT_LEVEL);
};

UserSchema.methods.comparePwd = async function (password) {
  return Bcrypt.compare(password, this.password).then(res => res);
};

UserSchema.statics.findOneByUsername = async function (email) {
  return this.findOne({ email: email });
};

UserSchema.statics.findOneByToken = async function (token) {
  return this.findOne({ token: token });
};

const model = Db.instance.model('User', UserSchema);

export default model;
