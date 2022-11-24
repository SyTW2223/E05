import { ObjectId, ObjectID } from 'mongodb';
import {Document, model, Schema} from 'mongoose';

const UserSchema = new Schema({
  id: {
    type: ObjectId,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    gender: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  list: {
    type: [],
    default: [],
  }
});

const Users = model('Users', UserSchema);