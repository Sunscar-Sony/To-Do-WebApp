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

  const TodoList = {
    1: {
      title: "Wake Up",
      status: Status.TODO,
    },
    2: {
      title: "Exercise",
      status: Status.IN_PROGRESS,
    },
    3: {
      title: "Get Ready",
      status: Status.DONE,
    },
    4: {
      title: "Go to office",
      status: Status.DONE,
    },
    5: {
      title: "Lunch",
      status: Status.DONE,
    }
  };

  const [todoList, setTodoList] = useState(TodoList);
  const [isAddTodoEnabled, setIsAddTodoEnabled] = useState(false);

  const handleAddTodoItem = (event) => {
    setIsAddTodoEnabled(true);
  };

  const handleDiscardTodo = () => {
    setIsAddTodoEnabled(false);
  };

  const handleAddTodo = (newTodoTitle) => {
    const newTodo = {
      id: Math.max(...Object.keys(todoList)) + 1, // Generate a unique ID
      title: newTodoTitle,
      status: Status.TODO, // Set default status
    };
    setTodoList((prevTodoList) => ({ ...prevTodoList, [newTodo.id]: newTodo }));
  };

  const handleDeleteToDo = (id) => {
    const updatedTodoList = { ...todoList };
    delete updatedTodoList[id]; // Remove the item with the matching id
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <div className='container'>
        <Header></Header>
        {/* Loop through the todoList object and populate TodoItem components */}
        {Object.entries(todoList).map(([id, todo]) => (
          todo.title.length > 0 && <TodoItem key={id} id={id} status={todo.status} text={todo.title} onDeleteTodo={handleDeleteToDo} />
        ))}
        <AddTodo isAddTodoEnabled={isAddTodoEnabled} onSaveTodo={handleAddTodo} onDiscardTodo={handleDiscardTodo}></AddTodo>
        <button className="todo-button" onClick={handleAddTodoItem}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
