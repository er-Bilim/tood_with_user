import argon from 'argon2';
import { randomUUID } from 'crypto';
import { Model, model, Schema, type HydratedDocument } from 'mongoose';
import type { IUser } from '../../types/user.types.ts';
import type { UserMethods } from './userModel.types.ts';

type UserModel = Model<IUser, {}, UserMethods>;

const UserSchema = new Schema<HydratedDocument<IUser>, UserModel, UserMethods>({
  username: {
    type: String,
    max: 15,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: async (username: string) => {
        const user = await User.findOne({ username });

        if (user) {
          return false;
        }

        return true;
      },
      message: 'Username already exists',
    },
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
