import argon from 'argon2';
import { randomUUID } from 'crypto';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    min: 3,
    max: 15,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const hash = await argon.hash(this.password);
  return (this.password = hash);
});

UserSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    const { password, __v, ...user } = ret;
    return user;
  },
});

UserSchema.methods.checkPassword = async function (password: string) {
  return await argon.verify(this.password, password);
};

UserSchema.methods.generateAuthToken = function () {
  this.token = randomUUID();
};

const User = model('User', UserSchema);
export default User;
