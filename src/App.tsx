import './App.css'
import FeedbackForm from './examples/react-hook-form/ContactForm'
import TodoListContainer from './examples/todoList/todoListContainer'

function App() {
  return (
    <main className="container-fluid flex items-center flex-col gap-3 justify-center my-20 w-full">
      <TodoListContainer />
      <FeedbackForm />
    </main >
  )
}

export default App