import { FC, createContext, useContext, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

interface ITodoItem {
  description?: string
  isComplete?: boolean
  createdAt: number
  id: string
}


// Context Setup
interface ITodoState {
  todoList: Array<ITodoItem>
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: ITodoItem }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_COMPLETE'; payload: string };

// @ts-ignore
const todoContext = createContext();

const initialState: ITodoState = {
  todoList: []
}

const todoReducer = (state: ITodoState = initialState, action: TodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state, todoList: [...state.todoList, action.payload]
      }
    case 'TOGGLE_COMPLETE':
      return {
        ...state, todoList: state.todoList.map((todo: ITodoItem) => todo.id === action.payload ? {
          ...todo,
          isComplete: !todo.isComplete
        } : todo)
      }
    case 'DELETE_TODO':
      return {
        ...state, todoList: state.todoList.filter((todo: ITodoItem) => todo.id !== action.payload)
      }
    default:
      return state;
  }
}

// provider

const TodoProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return <todoContext.Provider value={{ state, dispatch }}>{children}</todoContext.Provider>
}

const useTodoContext = (): any => {
  const context = useContext(todoContext);

  if (!context) {
    throw new Error('useTodoContext must be used withing provider!')
  }

  return context
}

// Context uses


const TodoListWithContext: FC = () => {

  const { state, dispatch } = useTodoContext();

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange'
  });

  const addTodo = (data: Pick<ITodoItem, 'description'>) => {
    dispatch({
      type: 'ADD_TODO',
      payload: { ...data, createdAt: Date.now(), isComplete: false, id: uuid() }
    })
    reset()
  }


  const onChangeTodo = (todoId: string) => {
    dispatch({
      type: 'TOGGLE_COMPLETE',
      payload: todoId
    })
  }

  const onRemoveTodo = (todoId: string) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: todoId
    })
  }

  return (
    <TodoProvider>
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5">
        <h1 className="text-3xl text-indigo-400 uppercase text-center py-2 font-bold mb-4">✍ Focus Forge (Context API)</h1>
        <h3 className="text-1xl text-black-500 uppercase text-center py-2 mb-4">[useContext & useReducer]</h3>
        <form className="flex space-x-2 mb-4" onSubmit={handleSubmit(addTodo)}>
          <input
            {...register('description')}
            type="text"
            id="newTodo"
            autoComplete="off"
            className="w-full border-gray-300 rounded-md p-2"
            placeholder="What you are planning to do next?"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        </form>

        <ul id="todoList" className="space-y-2 max-h-[600px] overflow-y-auto">
          {state.todoList.map((todoItem: ITodoItem) => {
            return <li key={todoItem.createdAt} className="flex items-center justify-between bg-gray-200 rounded-md p-2">
              <div className="flex gap-2 text-left flex-1 items-center"
                onClick={() => onChangeTodo(todoItem.id)}
              >
                <input
                  id={todoItem.description}
                  type="checkbox"
                  className="h-4 w-4 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mr-1"
                  checked={todoItem.isComplete}
                  onChange={() => onChangeTodo(todoItem.id)}
                />
                <label htmlFor={todoItem.description} className={`text-md text-gray-600 ${todoItem.isComplete ? 'line-through italic opacity-55' : ''}`}>{todoItem.description}</label>
              </div>
              <button
                onClick={() => onRemoveTodo(todoItem.id)}
                className="flex rotate-180 items-center justify-center rounded-full p-2 text-sm  border hover:border-gray-400 text-center align-middle">
                ✂
              </button>
            </li>
          })}
        </ul>
      </div>
    </TodoProvider>
  )
}

const TodoListWithProvider = () => {
  return <TodoProvider>
    <TodoListWithContext />
  </TodoProvider>
}

export default TodoListWithProvider