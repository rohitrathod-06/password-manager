import React, { use, useEffect, useState } from "react";


const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);

  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
  };
  const handleEdit = (index) => {
    setTodo(todos[index].todo);
    setEdit(index);
  };

  const handleDelete = (todo) => {
    setTodos(todos.filter((item) => item.todo !== todo));
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleToggle = (index) => {
    setTodos(
      todos.map((item, idx) =>
        index === idx ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <div className="min-h-screen  bg-violet-200">
        <div className="Headerd max-w-2xl mx-auto  ">
          <div className="header text-center p-4">
            <h1 className="text-5xl mt-6 mb-4 font-bold">Todo App</h1>
            <p className="text-md">Stay Organized and get Things done</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 mt-6">
            <div className="input flex justify-center gap-5">
              <input
                onChange={handleChange}
                value={todo}
                className=" w-full overflow-x-auto h-12 border-2  rounded-lg px-5"
                type="text"
                placeholder="What need to be done"
                required
              />
              <button
                onClick={handleAdd}
                disabled={!todo.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3  rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {" "}
                Add
              </button>
            </div>
          </div>

          <div className="bg-white text-blue-600 relative rounded-lg shadow-lg p-4 my-5 hover:cursor-pointer">
            <h2 className="pl-10">My Todos</h2>
            <div className="h-1 bg-blue-500  ml-8 flex  absolute bottom-0" style={{ minWidth: 80, width: "80px" }} />
          </div>
          <div className="form px-5 bg-white rounded-lg shadow-lg ">
            {todos.map((item, index) => {
              return (
                <div
                  className="todo flex items-center justify-between p-3 border-b-2 border-gray-200"
                  key={item.todo}
                >
                  <div className="flex  items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onClick={() => handleToggle(index)}
                      readOnly
                    />
                    <span
                      className={`break-words ${item.isCompleted ? "line-through" : ""}`}
                      style={{ wordBreak: "break-word", maxWidth: "400px", }}
                    >
                      {item.todo}
                    </span>
                  </div>
                  <div className="button cursor-pointer flex gap-4 items-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-red-400 hover:bg-red-500 text-white px-2 py-2 rounded-lg font-medium transition-colors duration-200 items-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.todo)}
                      className="bg-red-400 hover:bg-red-500 text-white px-2 py-2 rounded-lg font-medium transition-colors duration-200 items-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
