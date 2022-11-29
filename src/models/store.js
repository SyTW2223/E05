import { configureStore } from '@reduxjs/toolkit';
import listaReducer from '../models/listaSlice'

export default configureStore({
  reducer: {
    lista: listaReducer,
  },
})