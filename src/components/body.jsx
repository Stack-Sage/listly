import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Body() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      todos.forEach(item => {
        if (item.dueDate && new Date(item.dueDate) <= new Date()) {
          toast(`Reminder: ${item.todo} is due!`);
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [todos]);

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (editId) {
      setTodos(todos.map(item => item.id === editId ? { ...item, todo } : item));
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map(item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodos(newTodos);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    setTodo(todoToEdit.todo);
    setEditId(id);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="container w-full  overflow-hidden  mx-auto my-5 rounded-md pb-20 mb-25 p-5 bg-transparent h-screen ">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input

          
            type="text"
            onChange={handleChange}
            value={todo}
            className="p-1 w-auto rounded-lg text-violet-400 bg-black border-2 border-violet-800  hover:border-violet-500  "

            placeholder="Enter a Task Here . . . "
            
          />
          <button
            
            onClick={handleAdd}
            className="add rounded-2xl hover:scale-105 text-violet-500 font-semibold hover:border-violet-500 border-violet-800 border-2   bg-transparent  w-fit hover-cyan-100 p-2 mx-3"
            placeholder
          >
            {editId ? "Update" : "Add Todo"}
          </button>
        </div>
      

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="todos">
                {todos.length === 0 && <div className=" text-violet-500 animate-pulse font-semibold m-5 italic">No Todos To Display</div>}
                {todos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="todo flex w-full justify-between mb-2 p-2 bg-transparent border-2 border-violet-800  dark:bg-gray-700 rounded-xl shadow text-violet-500 font-bold  hover:border-violet-500 hover:scale-105 ease-in-out transition-transform "
                      >
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                          className="mr-2 cursor-pointer bg-black border-2 border-violet-300"
                        />
                        <div className={item.isCompleted ? "line-through decoration-slice flex-1" : "flex-1"}>
                          {item.todo}
                        </div>
                        <div className="buttons flex items-center">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="edit rounded-2xl hover:scale-105 transistion-transform ease-in-out  text-violet-500 font-bold border-2 border-violet-800 bg-transparent hover:border-violet-500 px-2 mx-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="delete rounded-2xl hover:scale-105 transistion-transform ease-in-out  text-violet-500 font-bold border-2 border-violet-800 bg-transparent hover:border-violet-500 px-2 mx-2 "
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Body;
