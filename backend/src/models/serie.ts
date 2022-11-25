import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de una serie
 */
interface SerieDocumentInterface extends Document {
  id: number,
  name: string,
  description: string,
  seasons: number,
  rating: number | '-'
}

/**
 * Esquema de una serie de mongoose
 */
const SerieSchema = new Schema<SerieDocumentInterface>({
  id: {
    type: Number,
    unique: true,
    require: [true, 'La serie debe tener un identificador'],
    trim: true
  },
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
  seasons: {
    type: Number,
    trim: true,
    default: 0,
  },
  details: {
    type: [String],
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
    default: '-',
    min: 0,
    max: 10
  },
});

/**
 * Modelo de una pelicula de mongoose
 */
export const Serie = model<SerieDocumentInterface>('Serie', SerieSchema);