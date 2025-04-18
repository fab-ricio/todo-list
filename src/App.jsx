import { useState } from 'react';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');

  // Ajouter une tâche
  const addTodo = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputText,
          completed: false,
        },
      ]);
      setInputText('');
    }
  };

  // Basculer l'état "completed" d'une tâche
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Supprimer une tâche
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filtrer les tâches
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  // Supprimer toutes les tâches terminées
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="app-container">
      <div className="container py-5">
        <div className="glass-card p-4 rounded-4 shadow-lg">
          <h1 className="text-center mb-4 display-4 fw-bold text-gradient">
            My Tasks
          </h1>

          {/* Formulaire d'ajout */}
          <form onSubmit={addTodo} className="mb-4">
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control border-2 border-primary rounded-start-4"
                placeholder="What needs to be done?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                className="btn btn-primary rounded-end-4 px-4"
                type="submit"
              >
                <FiPlus size={24} />
              </button>
            </div>
          </form>

          {/* Filtres */}
          <div className="d-flex gap-2 mb-4">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn btn-filter ${filter === f ? 'active' : ''}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Liste des tâches */}
          <div className="todo-list">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item card mb-3 shadow-sm ${
                  todo.completed ? 'completed' : ''
                }`}
              >
                <div className="card-body d-flex align-items-center py-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    className="form-check-input me-3"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />

                  {/* Texte */}
                  <span
                    className={`flex-grow-1 fs-5 ${
                      todo.completed ? 'text-decoration-line-through text-muted' : ''
                    }`}
                  >
                    {todo.text}
                  </span>

                  {/* Bouton Supprimer */}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn-action delete-btn"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="mt-4 text-center">
              <button onClick={clearCompleted} className="btn btn-clear">
                Clear Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;