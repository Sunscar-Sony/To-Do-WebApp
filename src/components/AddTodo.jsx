import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // Assuming FontAwesome icons are imported
import { useState } from 'react';

const AddTodo = (props) => {
  const [title, setTitle] = useState("");

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSaveClick = (event) => {
    props.onSaveTodo(title);
    props.onDiscardTodo(); 
    setTitle("");
  };

  const handleDiscardClick = (event) => {
    props.onDiscardTodo(); 
    setTitle("");
  };

  return (
    <li className="todo-item">
    {props.isAddTodoEnabled && (
    <>
      <span>
          <input
            className="todo-item-title"
            type="text"
            value={title}
            onChange={handleInputChange}
          />
      </span>
      <span>
        <FontAwesomeIcon icon={faSquareCheck} className="todo-item-action-icon" onClick={handleSaveClick} />
        <FontAwesomeIcon icon={faCircleXmark} className="todo-item-action-icon" onClick={handleDiscardClick} />
      </span>
    </>
    )}
    </li>
  );
};

export default AddTodo;
