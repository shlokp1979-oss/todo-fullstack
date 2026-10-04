import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Database se Todo lana
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/todos/")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  // Todo database me save karna
  function addTodo() {
    if (todo === "") {
      return;
    }

    fetch("http://127.0.0.1:8000/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setTodo("");
      });
  }

  // Todo database se delete karna
  function deleteTodo(id) {
    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((item) => item.id !== id));
      });
  }

  return (

    <div className="todo-container">
      <h1>Todo List</h1>

      <input
        className="todo-input"
        type="text"
        placeholder="Enter Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button className="add-button" onClick={addTodo}>
        Add Todo
      </button>

      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => completeTodo(item.id, item.completed)}
            />
            {item.title}

            <button onClick={() => updateTodo(item.id, item.title)}>
              Edit
            </button>

            <button onClick={() => deleteTodo(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  function updateTodo(id, oldTitle) {
    const newTitle = prompt("Enter new Todo", oldTitle);

    if (newTitle === null || newTitle === "") {
      return;
    }

    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(
          todos.map((item) => {
            if (item.id === id) {
              return data;
            }

            return item;
          })
        );
      });
  }

  function completeTodo(id, completed) {
    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(
          todos.map((item) => {
            if (item.id === id) {
              return data;
            }

            return item;
          })
        );
      });
  }
}



export default App;