import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const result = await axios.get('http://localhost:5000/todos');
    setTodos(result.data);
  };

  const addTodo = async () => {
    if (!newTodo) return;
    await axios.post('http://localhost:5000/todos', { text: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="App container-fluid">
      <h1 className='text-center bg-primary container-fluid'>Todo List</h1><br />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-5 m-1 border shadow rounded">
          <form className="form mt-2">
            <label htmlFor="item" className="form-label"><h4>Item : </h4></label>
            <input className='form-control'
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter New Item Name"
              autoFocus
              required
            />
            <button className='btn btn-success m-2' onClick={addTodo}><b>Insert</b></button>
          </form><hr />
          <table className='table table-bordered table-responsive text-center bg-light'>
            <thead className='bg-dark text-light'>
              <tr>
                <th>Item</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id} rowSpan={2}>
                  <td>
                    {todo.text}</td>
                  <td>
                    <button className='btn btn-danger text-dark' onClick={() => deleteTodo(todo._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

export default App;
