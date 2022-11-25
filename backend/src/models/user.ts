import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de un usuario
 */
interface UserDocumentInterface extends Document {
  name: string,
  email: string,
  years: number,
  list: [string]
}

/**
 * Esquema de un usuario de mongoose
 */
const UserSchema = new Schema<UserDocumentInterface>({
  name: {
    type: String,
    unique: true,
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
  years: {
    type: Number,
    trim: true,
    default: 10,
    min: 10,
    max: 99
  },
  list: {
    type: [String],
    trim:true
  }
});

/**
 * Modelo de un usuario de mongoose
 */
export const User = model<UserDocumentInterface>('User', UserSchema);