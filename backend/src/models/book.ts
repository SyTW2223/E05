import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de un libro
 */
interface BookDocumentInterface extends Document {
  name: string,
  description: string
  details: string[],
  value: number
}

/**
 * Esquema de un libro de mongoose
 */
const BookSchema = new Schema<BookDocumentInterface>({
  name: {
    type: String,
    unique: true,
    required: [true, 'El libro debe tener un nombre'],
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('The name of the book must start with a capital letter');
      }
    },
  },
  description: {
    type: String,
    required: [true, 'El libro debe tener una breve descripcion'],
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
 * Modelo de un libro de mongoose
 */
export const Book = model<BookDocumentInterface>('Book', BookSchema);