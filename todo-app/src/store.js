import { configureStore, createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(text) {
        return { payload: { id: Date.now(), text, completed: false } }
      }
    },
    toggleTodo(state, action) {
      const todo = state.find(t => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    updateTodo(state, action) {
      const { id, text } = action.payload
      const todo = state.find(t => t.id === id)
      if (todo) todo.text = text
    },
    deleteTodo(state, action) {
      return state.filter(t => t.id !== action.payload)
    }
  }
})

export const { addTodo, toggleTodo, updateTodo, deleteTodo } = todosSlice.actions

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
})
