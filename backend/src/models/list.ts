import {Document, Schema, model} from 'mongoose';

/**
 * Interfaz de una lista
 */

interface ListDocumentInterface extends Document {
  name: string,
  listId: number,
  itemsId: number[],
  usersId: number[],
}

/**
 * Esquema de una lista de mongoose
 */
const ListSchema = new Schema<ListDocumentInterface>({
  name: {
    type: String,
    unique: true,
    required: [true, 'La lista debe tener un nombre.'],
    trim: true,
  },
  listId: {
    type: Number,
    unique: true,
    required: [true, 'La lista debe tener un id.'],
    trim: true,
  },
  itemsId: {
    type: [Number],
    trim: true,
  },
  usersId: {
    type: [Number],
    trim:true
  }
});

/**
 * Modelo de un usuario de mongoose
 */
export const List = model<ListDocumentInterface>('List', ListSchema);