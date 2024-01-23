import './App.css'
import FeedbackForm from './examples/react-hook-form/ContactForm'
import TodoListContainer from './examples/todoList/todoListContainer'
import TodoListWithContext from './examples/todoList/todoListWithContext'

function App() {
  return (
    <main className="container-fluid flex items-center flex-col gap-3 justify-center my-20 w-full">
      <TodoListWithContext />
      <TodoListContainer />
      <FeedbackForm />
    </main >
  )
}

export default App