import { createSlice } from '@reduxjs/toolkit'

export const listaSlice = createSlice({
  name: 'lista',
  initialState: {
    value: ['1'],
  },
  reducers: {
    add: (state) => {
      state.value.push((state.value.length + 1).toString() + ' ');
    },
    remove: (state) => {
      state.value.pop();
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = listaSlice.actions

export default listaSlice.reducer