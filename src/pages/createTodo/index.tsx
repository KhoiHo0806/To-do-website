import { TodoItemState } from "@store/slices/todoListSlice";
import { addItem } from "@store/slices/todoListSlice";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateTodo = () => {
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const existingList = localStorage.getItem("todoItemList");
  const todoListLocalStorage = existingList ? JSON.parse(existingList) : [];

  function generateUniqueId(todoList: TodoItemState[]): string {
    let id = uuidv4();
    // Check if the generated ID exists in the todoList
    while (todoList.find((item) => item.id === id)) {
      id = uuidv4(); // Regenerate ID if it already exists
    }
    return id;
  }

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(t("error.emptyDescription"));
    }
  }, [i18n.language, description, t]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (description === "") {
      setErrorMessage(t("error.emptyDescription"));
      return
    }

    const todoItem = {
      id: generateUniqueId(todoListLocalStorage),
      description: description,
      isFinished: false,
    };
    todoListLocalStorage.push(todoItem);
    localStorage.setItem("todoItemList", JSON.stringify(todoListLocalStorage));
    dispatch(addItem({ todoItem, message: t("alert.itemAdded") }));
    navigate("/todo");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          {t("label.createItem")}
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-gray-600 font-medium mb-2"
            >
              {t("label.itemDescription")}
            </label>
            <input
              type="text"
              id="description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("label.enterTodoItem")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {t("button.addTodo")}
          </button>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
