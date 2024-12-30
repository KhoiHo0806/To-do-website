import { TodoItemState } from "@store/slices/todoListSlice";
import { addItem } from "@store/slices/todoListSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateTodo = () => {
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingList = localStorage.getItem("todoItemList");
  const todoListLocalStorage = existingList ? JSON.parse(existingList) : [];

  function generateUniqueId(todoList: TodoItemState[]): string {
    console.log("todoList test :", todoList);
    let id = uuidv4();
    // Check if the generated ID exists in the todoList
    while (todoList.find((item) => item.id === id)) {
      id = uuidv4(); // Regenerate ID if it already exists
    }
    return id;
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description === "") {
      setErrorMessage("Description cannot be empty!");
      return;
    }
    const todoItem = {
      id: generateUniqueId(todoListLocalStorage),
      description: description,
      isFinished: false,
    };
    todoListLocalStorage.push(todoItem);
    localStorage.setItem("todoItemList", JSON.stringify(todoListLocalStorage));
    dispatch(addItem({ todoItem }));
    navigate("/todo");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Create Todo Item
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-gray-600 font-medium mb-2"
            >
              Item Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your todo item"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Todo
          </button>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
