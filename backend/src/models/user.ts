import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de un usuario
 */
interface UserDocumentInterface extends Document {
  username: string,
  name: string,
  password: string
  email: string,
  dob: string,
  list: []
}

/**
 * Esquema de un usuario de mongoose
 */
const UserSchema = new Schema<UserDocumentInterface>({
  username: {
    type: String,
    unique: true,
    required: [true, 'El usuario debe tener un nombre de usuario'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'El usuario debe tener un nombre'],
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('The name of the user must start with a capital letter');
      }
    },
  },
  email: {
    type: String,
    required: [true, 'El usuario debe tener un correo electronico'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'El usuario debe tener una contraseña'],
    trim: true,
  },
  dob: {
    type: String,
    trim: true,
  },
  list: {
    type: [],
    trim:true
  }
});

/**
 * Modelo de un usuario de mongoose
 */
export const User = model<UserDocumentInterface>('User', UserSchema);