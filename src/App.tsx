import React from 'react'
import {useEffect, useState} from 'react'
import './App.css'

type Todo = {
  text: string;
  completed: boolean
}

function App() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<Todo[]>(() => {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!text.trim()) return;

      setTodos([...todos, {text, completed: false}]);
      setText('');
    }

    const toggleTodo = (index: number) => {
      setTodos(
        todos.map((todo, i) =>
        i === index ? {...todo, completed: !todo.completed} : todo 
      )
      );      
    };

    const deleteTodo = (index: number) => {
      setTodos(todos.filter((_, i) => i !== index));
    };

  return (
    <div className="app">
      <h1>To Do</h1>

      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTodo(index)}
              className={todo.completed ? "completed" : ""}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
