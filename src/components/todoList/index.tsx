import { TodoItemState } from "@store/slices/todoListSlice";
import { removeItem, updateTodoItem } from "@store/slices/todoListSlice";
import { RootState } from "@store/store";
import clsx from "clsx";
import { useState, useRef, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import useDebounce from "@customHooks/useDebounce";

type TodoListProps = {
  filterString: string;
  searchString: string;
  testFunction: () => void;
};

const TodoList: React.FC<TodoListProps> = ({
  filterString,
  searchString,
  testFunction,
}) => {
  const todoList = useSelector((state: RootState) => state.todoList.todoList);
  const todoListLocalStorage = localStorage.getItem("todoItemList");
  const parsedTodoListLocalStorage = todoListLocalStorage
    ? JSON.parse(todoListLocalStorage)
    : [];
const debouncedSearchString = useDebounce(searchString,300);

  const [editTingItemID, setEditTingItemID] = useState<string | null>(null);

  const itemEditRef = useRef<HTMLSpanElement | null>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  //   auto focus on description when click edit
  useEffect(() => {
    if (editTingItemID && itemEditRef.current) {
      itemEditRef.current.focus();
    }
  }, [editTingItemID]);
  console.log("component rerendered");

  // filter function
  const fileredTodoList = useMemo(() => {
    console.log("list rerendered"); // Log for testing
    return todoList.filter((item) => {
      const matchSearch = item.description.toLocaleLowerCase().includes(debouncedSearchString.toLocaleLowerCase());
      const matchFilter = filterString === "finished" ? item.isFinished : true;
      return matchSearch && matchFilter;
    });
  }, [todoList, debouncedSearchString, filterString]);

  //   const fileredTodoList = todoList.filter((item) => {
  //     console.log("list rerendered")
  //     const matchSearch = item.description.includes(debouncedSearchString);
  //     const matchFilter = filterString === "finished" ? item.isFinished : true;
  //     return matchSearch && matchFilter;
  //   });

  //   update list
  const updateTodoListHandler = (updateItem: TodoItemState) => {
    const updatedList = parsedTodoListLocalStorage.map(
      (todoItem: TodoItemState) =>
        todoItem.id === updateItem.id ? updateItem : todoItem,
    );
    localStorage.setItem("todoItemList", JSON.stringify(updatedList));
    dispatch(updateTodoItem({ todoItem: updateItem }));
  };

  //   toggle checkbox
  const itemCheckboxToggler = (item: TodoItemState) => {
    const updatedItem = { ...item, isFinished: !item.isFinished };
    updateTodoListHandler(updatedItem);
  };

  //   edit item
  const itemEditHandler = (item: TodoItemState, newDescription: string) => {
    if (newDescription === item.description) {
      setEditTingItemID(null);
      return;
    }
    const updatedItem = { ...item, description: newDescription };
    updateTodoListHandler(updatedItem);
    setEditTingItemID(null);
    toast.success(t("alert.itemSaved"), {
      duration: 1500,
      className: "bg-cyan-500 text-white p-4 rounded-md shadow-lg",
    });
  };

  // remove item
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

  //   click out side or press Enter to finsh editing
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
      {fileredTodoList.length >= 1 ? (
        fileredTodoList.map((item) => {
          return (
            <div
              className={clsx(
                "border flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out sm:flex-col sm:items-start ",
                { "bg-emerald-300": item.isFinished },
              )}
              key={item.id}
              onClick={testFunction}
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
          {filterString !== "all" || searchString !== ""
            ? t("error.noFilteredItemsFound")
            : t("label.letAddSomeTodo")}
        </p>
      )}
    </div>
  );
};

export default memo(TodoList);
// export default TodoList;
