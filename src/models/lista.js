import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove } from './listaSlice'


export function Lista() {
  const lista = useSelector((state) => state.lista.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="add value"
          onClick={() => dispatch(add())}
        >
          Increment
        </button>
        <span>{lista}</span>
        <button
          aria-label="remove value"
          onClick={() => dispatch(remove())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}