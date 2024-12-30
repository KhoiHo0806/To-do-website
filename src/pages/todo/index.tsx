import { removeItem, updateTodoItem } from "@store/slices/todoListSlice";
import { TodoItemState } from "@store/slices/todoListSlice";
import { RootState } from "@store/store";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Todo = () => {
  const todoList = useSelector((state: RootState) => state.todoList.todoList);
  const todoListLocalStorage = localStorage.getItem("todoItemList");
  const parsedTodoListLocalStorage = todoListLocalStorage
    ? JSON.parse(todoListLocalStorage)
    : [];

  const dispatch = useDispatch();

  const [editTingItemID, setEditTingItemID] = useState<string | null>(null);

  const itemEditRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (editTingItemID && itemEditRef.current) {
      itemEditRef.current.focus();
    }
  }, [editTingItemID]);

  const removeItemHandler = (item: TodoItemState) => {
    toast("Are you sure?", {
      duration: Infinity,
      action: (
        <button
          onClick={() => {
            toast.dismiss();
            const updatedList = parsedTodoListLocalStorage.filter(
              (todoItem: TodoItemState) => todoItem.id !== item.id
            );
            localStorage.setItem("todoItemList", JSON.stringify(updatedList));
            dispatch(removeItem({ todoItem: item }));
          }}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          Confirm
        </button>
      ),
      cancel: (
        <button
          onClick={() => {
            toast.dismiss();
          }}
          className="px-3 py-1 text-white bg-cyan-500 rounded hover:bg-cyan-600 focus:ring focus:ring-gray-300"
        >
          Cancel
        </button>
      ),
    });
  };

  const updateTodoListHandler = (updateItem: TodoItemState) => {
    const updatedList = parsedTodoListLocalStorage.map(
      (todoItem: TodoItemState) =>
        todoItem.id === updateItem.id ? updateItem : todoItem
    );
    localStorage.setItem("todoItemList", JSON.stringify(updatedList));
    dispatch(updateTodoItem({ todoItem: updateItem }));
  };

  const itemCheckboxToggler = (item: TodoItemState) => {
    const updatedItem = { ...item, isFinished: !item.isFinished };
    updateTodoListHandler(updatedItem);
  };

  const itemEditHandler = (item: TodoItemState, newDescription: string) => {
    const updatedItem = { ...item, description: newDescription };
    updateTodoListHandler(updatedItem);
    setEditTingItemID(null);
    toast.success("item saved", {
      duration: 1500,
      className: "bg-cyan-500 text-white p-4 rounded-md shadow-lg",
    });
  };
  const handleKeyDown = (
    item: TodoItemState,
    event: React.KeyboardEvent<HTMLSpanElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter behavior
      const newDescription = event.currentTarget.textContent || "";
      itemEditHandler(item, newDescription);
    }
  };

  return (
    <div className="flex flex-col gap-2 px-2 lg:px-64 md:px-40 sm:px-24 py-4 sm:py-12 md:py-16 overflow-hidden">
      <div className="flex justify-end mt-6">
        <Link to="/createTodo">
          <button className="px-4 py-2 text-white bg-cyan-500 rounded-lg shadow hover:bg-cyan-600 focus:ring focus:ring-cyan-300 transition-colors duration-300">
            Add More Todo
          </button>
        </Link>
      </div>
      <div className="flex flex-col flex-1 gap-2 overflow-y-auto">
        {todoList.length >= 1 ? (
          todoList.map((item) => {
            return (
              <div
                className="border flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 sm:flex-col sm:items-start"
                key={item.id}
              >
                {/* Checkbox and Task */}
                <div className="flex items-center gap-4 sm:w-full">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-cyan-500 border-gray-300 rounded focus:ring-cyan-400"
                    checked={item.isFinished}
                    onChange={() => itemCheckboxToggler(item)}
                  />
                  {item.id === editTingItemID ? (
                    <span
                      ref={itemEditRef}
                      contentEditable
                      suppressContentEditableWarning
                      className="text-gray-800 text-lg sm:text-base line-clamp-1 focus:outline-none border-b-2"
                      onBlur={(e) =>
                        itemEditHandler(item, e.currentTarget.textContent || "")
                      }
                      onKeyDown={(e) => handleKeyDown(item, e)}
                    >
                      {item.description}
                    </span>
                  ) : (
                    <span className="text-gray-800 text-lg sm:text-base line-clamp-1">
                      {item.description}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:mt-3 sm:w-full sm:justify-start">
                  <button
                    onClick={() => setEditTingItemID(item.id)}
                    className="px-3 py-1 text-sm text-white bg-cyan-500 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeItemHandler(item)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:ring focus:ring-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-cyan-500 flex items-center justify-center">
            Let's add some todos
          </p>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Todo;
