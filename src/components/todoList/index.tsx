import { TodoItemState } from "@store/slices/todoListSlice";
import {
  removeItem,
  updateTodoItem,
  updateTodoList,
} from "@store/slices/todoListSlice";
import { RootState } from "@store/store";
import clsx from "clsx";
import { useState, useRef, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

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

  // filter function
  const fileredTodoList = useMemo(() => {
    console.log("list rerendered"); // Log for testing
    return todoList.filter((item) => {
      const matchSearch = item.description
        .toLocaleLowerCase()
        .includes(searchString.toLocaleLowerCase());
      const matchFilter = filterString === "finished" ? item.isFinished : true;
      return matchSearch && matchFilter;
    });
  }, [todoList, searchString, filterString]);

  //   const fileredTodoList = todoList.filter((item) => {
  //     console.log("list rerendered")
  //     const matchSearch = item.description.includes(searchString);
  //     const matchFilter = filterString === "finished" ? item.isFinished : true;
  //     return matchSearch && matchFilter;
  //   });

  const [editTingItemID, setEditTingItemID] = useState<string | null>(null);
  const [draggingMobileItem, setDraggingMobileItem] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const itemEditRef = useRef<HTMLSpanElement | null>(null);
  const itemIDRef = useRef<string | null>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  //   auto focus on description when click edit
  useEffect(() => {
    if (editTingItemID && itemEditRef.current) {
      itemEditRef.current.focus();
    }
  }, [editTingItemID]);
  console.log("component rerendered");

  //   update list
  const updateTodoListHandler = (updateItem: TodoItemState) => {
    const updatedList = parsedTodoListLocalStorage.map(
      (todoItem: TodoItemState) =>
        todoItem.id === updateItem.id ? updateItem : todoItem
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
              (todoItem: TodoItemState) => todoItem.id !== item.id
            );
            localStorage.setItem("todoItemList", JSON.stringify(updatedList));
            dispatch(
              removeItem({ todoItem: item, message: t("alert.itemDeleted") })
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
  const keyDownHandler = (
    item: TodoItemState,
    event: React.KeyboardEvent<HTMLSpanElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter behavior
      const newDescription = event.currentTarget.textContent || "";
      itemEditHandler(item, newDescription);
    }
  };

  //drag and drop desktop
  const dragStartHandler = (id: string) => {
    itemIDRef.current = id;
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    //allow drop
    e.preventDefault();
  };

  const dragEndHandler = (targetID: string) => {
    if (itemIDRef.current === null) return;

    const pseudoList = [...fileredTodoList];
    const dragItemIndex = pseudoList.findIndex(
      (item) => item.id === itemIDRef.current
    );
    const targetItemIndex = pseudoList.findIndex(
      (item) => item.id === targetID
    );

    const [dragItem] = pseudoList.splice(dragItemIndex, 1);
    pseudoList.splice(targetItemIndex, 0, dragItem);

    dispatch(updateTodoList({ newList: pseudoList }));
    localStorage.setItem("todoItemList", JSON.stringify(pseudoList));
    itemIDRef.current = null;
  };
  // drag and drop mobile
  const touchStartHandler = (e: React.TouchEvent, item: TodoItemState) => {
    const touch = e.touches[0];
    setDraggingMobileItem({ id: item.id, x: touch.clientX, y: touch.clientY });
  };

  // const touchMoveHandler = (e: React.TouchEvent) => {

  //   if (!draggingMobileItem) return;
  //   e.preventDefault();
  //   const touch = e.touches[0];

  //   const deltaX = touch.clientX - draggingMobileItem.x;
  //   const deltaY = touch.clientY - draggingMobileItem.y;

  //   const element = document.getElementById(`#item-${draggingMobileItem.id}`);
  //   if (element) {
  //     element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  //   }
  // };

  useEffect(() => {
    const touchMoveListener = (e: TouchEvent) => {
      e.preventDefault(); // Prevent default scrolling

      if (!draggingMobileItem) return;

      const touch = e.touches[0];

      const deltaX = touch.clientX - draggingMobileItem.x;
      const deltaY = touch.clientY - draggingMobileItem.y;

      const element = document.getElementById(`#item-${draggingMobileItem.id}`);
      if (element) {
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
      console.log("touch dragging");
    };

    if (draggingMobileItem) {
      // Attach the event listener when dragging starts
      document.addEventListener("touchmove", touchMoveListener, {
        passive: false,
      });
      // Clean up the event listener when dragging ends
      return () => {
        document.removeEventListener("touchmove", touchMoveListener);
      };
    }
  }, [draggingMobileItem]);

  const touchEndHandler = (event: React.TouchEvent) => {
    console.log("dont have dragging");
    if (!draggingMobileItem) return;
    console.log("have dragging");
    const touch = event.changedTouches[0]; // Get the touch position (x, y)
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    const targetItemID = findTargetItemByCoordinates(touchX, touchY);
    if (!targetItemID) return;

    const pseudoList = [...fileredTodoList];
    const dragItemIndex = pseudoList.findIndex(
      (item) => item.id === draggingMobileItem.id
    );

    const targetItemIndex = pseudoList.findIndex(
      (item) => item.id === targetItemID
    );

    if (targetItemIndex !== -1 && dragItemIndex !== targetItemIndex) {
      const [dragItem] = pseudoList.splice(dragItemIndex, 1);
      pseudoList.splice(targetItemIndex, 0, dragItem);

      dispatch(updateTodoList({ newList: pseudoList }));
      localStorage.setItem("todoItemList", JSON.stringify(pseudoList));
    }
    console.log("draggingMobileItem.id: " + draggingMobileItem.id);
    console.log("targetItemID: " + targetItemID);
    setDraggingMobileItem(null);
  };

  const findTargetItemByCoordinates = (x: number, y: number) => {
    // This function finds the target item based on the touch coordinates
    // Compare the touch position (x, y) with the positions of the items in the list

    const listItems = document.querySelectorAll(".todo-item"); // Adjust the class based on your item structure

    for (let item of listItems) {
      const rect = item.getBoundingClientRect(); // Get the item's position and size

      // Check if the touch position is inside the item's bounding box
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return item.id.replace("item-", ""); // Return the ID of the target item
      }
    }

    return null; // Return null if no item was found
  };

  return (
    <div className="flex flex-col flex-1 gap-2 overflow-y-auto">
      {fileredTodoList.length >= 1 ? (
        fileredTodoList.map((item) => {
          return (
            <div
              className={clsx(
                "todo-item border flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out sm:flex-col sm:items-start ",
                { "bg-emerald-300": item.isFinished }
              )}
              key={item.id}
              id={`item-${item.id}`}
              onClick={testFunction}
              draggable="true"
              onDragStart={() => dragStartHandler(item.id)}
              onTouchStart={(e) => touchStartHandler(e, item)}
              onDragOver={(e) => dragOverHandler(e)}
              // onTouchMove={(e) => {
              //   touchMoveHandler(e);
              // }}
              onDrop={() => dragEndHandler(item.id)}
              onTouchEnd={(e) => touchEndHandler(e)}
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
                    onKeyDown={(e) => keyDownHandler(item, e)}
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
