import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de un libro
 */
interface BookDocumentInterface extends Document {
  id: number,
  name: string,
  description: string,
  numberPages: number,
  publisher: string,
  rating: number
}

/**
 * Esquema de un libro de mongoose
 */
const BookSchema = new Schema<BookDocumentInterface>({
  id: {
    type: Number,
    unique: true,
    require: [true, 'El libro debe tener un identificador'],
    trim: true
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'El libro debe tener un nombre'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'El libro debe tener una breve descripcion'],
    trim: true,
  },
  numberPages: {
    type: Number,
    trim: true,
    min: 0,
    max: 3000
  },
  publisher: {
    type: String,
    trim: true
  },
  rating: {
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