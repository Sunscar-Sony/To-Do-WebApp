import React, { useState } from 'react'; 
import './App.css';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import './style.css';
import AddTodo from './components/AddTodo';

const App = () => {

  const Status = Object.freeze({ 
    TODO: 0,
    IN_PROGRESS: 1, 
    DONE: 2
  });

  const [todoList, setTodoList] = useState([]);
  const [isAddTodoEnabled, setIsAddTodoEnabled] = useState(false);

  const handleAddTodoItem = () => {
    setIsAddTodoEnabled(true);
  };

  const handleDiscardTodo = () => {
    setIsAddTodoEnabled(false);
  };

  const handleAddTodo = (newTodoTitle) => {
    const newTodo = {
      id: todoList.length + 1, // Generate a unique ID
      title: newTodoTitle,
      status: Status.TODO, // Set default status
    };
    setTodoList([...todoList, newTodo]);
    setIsAddTodoEnabled(false); // Close the add todo form
  };

  const handleDeleteToDo = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <div className='container'>
        <Header></Header>
        {/* Loop through the todoList array and populate TodoItem components */}
        {todoList.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} status={todo.status} text={todo.title} onDeleteTodo={handleDeleteToDo} />
        ))}
        <AddTodo isAddTodoEnabled={isAddTodoEnabled} onSaveTodo={handleAddTodo} onDiscardTodo={handleDiscardTodo}></AddTodo>
        <button className="todo-button" onClick={handleAddTodoItem}>Add Todo</button>
      </div>
    </>
  );
}

export default App;

