import { useState } from "react"
import { useForm } from "react-hook-form"

interface ITodoItem {
  label: string
  createdAt: number
  isCompleted: boolean
}

const TodoListContainer = () => {
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);
  const { handleSubmit, register, reset } = useForm();

  const addTodo = (data: any) => {
    setTodoList([...todoList, { ...data, createdAt: Date.now(), isCompleted: false }])
    reset()
  }

  const onChangeTodo = (todoId: number) => {
    setTodoList((prevTodos: ITodoItem[]) => prevTodos.map((pTodo) => pTodo.createdAt === todoId ? { ...pTodo, isCompleted: !pTodo.isCompleted } : pTodo))
  }

  const onRemoveTodo = (todoId: number) => {
    setTodoList((prevTodos: ITodoItem[]) => prevTodos.filter((pTodo) => pTodo.createdAt !== todoId))
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-4/5">
      <h1 className="text-3xl text-indigo-400 uppercase text-center py-2 font-bold mb-4">✍ Focus Forge</h1>
      <form className="flex space-x-2 mb-4" onSubmit={handleSubmit(addTodo)}>
        <input
          {...register('label')}
          type="text"
          id="newTodo"
          autoComplete="off"
          className="w-full border-gray-300 rounded-md p-2"
          placeholder="What you are planning to do next?"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
      
      <ul id="todoList" className="space-y-2 max-h-[600px] overflow-y-auto">
        {todoList.map((todoItem: ITodoItem) => {
          return <li key={todoItem.createdAt} className="flex items-center justify-between bg-gray-200 rounded-md p-2">
            <div className="flex gap-2 text-left flex-1 items-center"
              onClick={() => onChangeTodo(todoItem.createdAt)}
            >
              <input
                id={todoItem.label}
                type="checkbox" className="h-4 w-4 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mr-1" checked={todoItem.isCompleted}
                onChange={() => onChangeTodo(todoItem.createdAt)}
              />
              <label htmlFor={todoItem.label} className={`text-md text-gray-600 ${todoItem.isCompleted ? 'line-through italic opacity-55' : ''}`}>{todoItem.label}</label>
            </div>
            <button
              onClick={() => onRemoveTodo(todoItem.createdAt)}
              className="flex rotate-180 items-center justify-center rounded-full p-2 text-sm  border hover:border-gray-400 text-center align-middle">
              ✂ 
              </button>
          </li>
        })}
      </ul>
    </div>
  )
}

export default TodoListContainer