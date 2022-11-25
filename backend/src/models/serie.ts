import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de una serie
 */
interface SerieDocumentInterface extends Document {
  name: string,
  description: string,
  details: string[],
  value: number
}

/**
 * Esquema de una serie de mongoose
 */
const SerieSchema = new Schema<SerieDocumentInterface>({
  name: {
    type: String,
    unique: true,
    required: [true, 'La serie debe tener un nombre'],
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('The name of the serie must start with a capital letter');
      }
    },
  },
  description: {
    type: String,
    required: [true, 'La serie debe tener una breve descripcion'],
    trim: true,
  },
  details: {
    type: [String],
    trim: true,
  },
  value: {
    type: Number,
    trim: true,
    default: 0,
    min: 0,
    max: 10
  },
});

/**
 * Modelo de una pelicula de mongoose
 */
export const Serie = model<SerieDocumentInterface>('Serie', SerieSchema);