import { useState } from 'react'
import { FiEdit, FiTrash2, FiCheckCircle } from 'react-icons/fi'
import styles from './TodoItem.module.scss'

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editText.trim()) {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.checkboxContainer}>
        {/* Case à cocher */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)} // Appelle la fonction pour basculer l'état
          className={styles.checkbox}
          aria-label="Mark as completed"
        />
      </div>
  
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className={styles.editForm}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            className={styles.editInput}
          />
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      ) : (
        <div className={styles.todoContent}>
          <span className={styles.todoText}>{todo.text}</span>
          <div className={styles.actions}>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
              aria-label="Edit todo"
            >
              <FiEdit />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className={styles.deleteButton}
              aria-label="Delete todo"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem