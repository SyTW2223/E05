import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de una película
 */
interface FilmDocumentInterface extends Document {
  name: string,
  description: string,
  details: string[],
  value: number
}

/**
 * Esquema de una pelicula de mongoose
 */
const FilmSchema = new Schema<FilmDocumentInterface>({
  name: {
    type: String,
    unique: true,
    required: [true, 'La pelicula debe tener un nombre'],
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('The name of the film must start with a capital letter');
      }
    },
  },
  description: {
    type: String,
    required: [true, 'La pelicula debe tener una breve descripcion'],
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
export const Film = model<FilmDocumentInterface>('Film', FilmSchema);