import { TodoItemState } from "@store/slices/todoListSlice";
import { removeItem, updateTodoItem } from "@store/slices/todoListSlice";
import { RootState } from "@store/store";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

type TodoListProps = {
  testProp: string;
};

const TodoList: React.FC<TodoListProps> = ({ testProp }) => {
  const todoList = useSelector((state: RootState) => state.todoList.todoList);
  const todoListLocalStorage = localStorage.getItem("todoItemList");
  const parsedTodoListLocalStorage = todoListLocalStorage
    ? JSON.parse(todoListLocalStorage)
    : [];
  console.log(testProp);

  const [editTingItemID, setEditTingItemID] = useState<string | null>(null);

  const itemEditRef = useRef<HTMLSpanElement | null>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (editTingItemID && itemEditRef.current) {
      itemEditRef.current.focus();
    }
  }, [editTingItemID]);

  const updateTodoListHandler = (updateItem: TodoItemState) => {
    const updatedList = parsedTodoListLocalStorage.map(
      (todoItem: TodoItemState) =>
        todoItem.id === updateItem.id ? updateItem : todoItem,
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
    toast.success(t("alert.itemSaved"), {
      duration: 1500,
      className: "bg-cyan-500 text-white p-4 rounded-md shadow-lg",
    });
  };

  const removeItemHandler = (item: TodoItemState) => {
    toast(t("label.areYouSure"), {
      duration: Infinity,
      action: (
        <button
          onClick={() => {
            toast.dismiss();
            const updatedList = parsedTodoListLocalStorage.filter(
              (todoItem: TodoItemState) => todoItem.id !== item.id,
            );
            localStorage.setItem("todoItemList", JSON.stringify(updatedList));
            dispatch(
              removeItem({ todoItem: item, message: t("alert.itemDeleted") }),
            );
          }}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          {t("button.confirm")}
        </button>
      ),
      cancel: (
        <button
          onClick={() => {
            toast.dismiss();
          }}
          className="px-3 py-1 text-white bg-cyan-500 rounded hover:bg-cyan-600 focus:ring focus:ring-gray-300"
        >
          {t("button.cancel")}
        </button>
      ),
    });
  };

  const handleKeyDown = (
    item: TodoItemState,
    event: React.KeyboardEvent<HTMLSpanElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter behavior
      const newDescription = event.currentTarget.textContent || "";
      itemEditHandler(item, newDescription);
    }
  };

  return (
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
                  {t("button.edit")}
                </button>
                <button
                  onClick={() => removeItemHandler(item)}
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:ring focus:ring-red-300"
                >
                  {t("button.delete")}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-cyan-500 flex items-center justify-center">
          {t("label.letAddSomeTodo")}
        </p>
      )}
    </div>
  );
};

export default TodoList;