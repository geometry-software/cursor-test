import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, updateTodo, deleteTodo } from './store.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function TodoList() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text.trim()))
      setText('')
    }
  }

  const handleUpdate = id => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText.trim() }))
      setEditingId(null)
      setEditText('')
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add todo"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="space-y-2">
        {todos.map(todo => (
          <Card key={todo.id} className="p-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            {editingId === todo.id ? (
              <>
                <Input
                  className="flex-1"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <Button size="sm" onClick={() => handleUpdate(todo.id)}>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span className={todo.completed ? 'line-through flex-1' : 'flex-1'}>
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingId(todo.id)
                    setEditText(todo.text)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </Button>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
