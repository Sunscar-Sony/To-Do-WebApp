import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSquareCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItem = (props) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(props.text);

    const [buttonText, setButtonText] = useState(() => {
        switch (props.status) {
          case 0:
            return "To Do";
          case 1:
            return "In Progress";
          case 2:
            return "Done";
          default:
            console.warn("Invalid status prop for TodoItem:", props.status);
            return "";
        }
      });
    
      const [buttonClass, setButtonClass] = useState(() => `status-${buttonText.toLowerCase()}`);
    
      const [status, setStatus] = useState(props.status); // Initial status from props
    
      const handleStatusChange = () => {
        const newStatus = (status + 1) % 3;
        setStatus(newStatus);
      };
    
      // useEffect to update buttonText and buttonClass on status change
      useEffect(() => {
        const updateButtonProps = () => {
          switch (status) {
            case 0:
              setButtonText("To Do");
              setButtonClass("status-todo");
              break;
            case 1:
              setButtonText("In Progress");
              setButtonClass("status-in-progress");
              break;
            case 2:
              setButtonText("Done");
              setButtonClass("status-done");
              break;
            default:
              console.warn("Invalid status prop for TodoItem:", status);
          }
        };
    
        updateButtonProps();
      }, [status]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (event) => {
        setEditText(event.target.value);
    };

    const handleDeleteClick = () => {
        props.onDeleteTodo(props.id);
    };

    return (
        <li className="todo-item">
            <span>
                {isEditing ? (
                <input
                    className="todo-item-title"
                    type="text"
                    value={editText}
                    onChange={handleInputChange}
                />
                ) : (
                <span className="todo-item-title">{editText}</span>
                )}
            </span>
            <span>
                {isEditing ? (
                    <FontAwesomeIcon icon={faSquareCheck} className="todo-item-action-icon" onClick={handleSaveClick} />
                    ) : (
                    <FontAwesomeIcon icon={faPenToSquare} className="todo-item-action-icon" onClick={handleEditClick} />
                )}
                <FontAwesomeIcon icon={faTrash} className="todo-item-action-icon" onClick={handleDeleteClick} />
                <button className={buttonClass} onClick={handleStatusChange}>{buttonText}</button>
            </span>
        </li>
    );
}

export default TodoItem;