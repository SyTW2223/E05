import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de una película
 */
interface FilmDocumentInterface extends Document {
  id: number,
  name: string,
  description: string,
  rating: number | '-'
  yearPublication: number
}

/**
 * Esquema de una pelicula de mongoose
 */
const FilmSchema = new Schema<FilmDocumentInterface>({
  id: {
    type: Number,
    unique: true,
    required: [true, 'La pelicula debe tener un identificador'],
    trim: true
  },
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
  rating: {
    type: Number,
    trim: true,
    default: '-',
    min: 0,
    max: 10
  },
  yearPublication: {
    type: Number,
    trim: true,
    default: null
  }
});

/**
 * Modelo de una pelicula de mongoose
 */
export const Film = model<FilmDocumentInterface>('Film', FilmSchema);