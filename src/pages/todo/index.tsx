import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";

const Todo = () => {
  const todoList = useSelector((state: RootState) => state.todoList.todoList);

  const dispatch = useDispatch();
  
  const removeItemHandler = () =>{

  }
  

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
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 sm:flex-col sm:items-start"
                key={item.id}
              >
                {/* Checkbox and Task */}
                <div className="flex items-center gap-4 sm:w-full">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-cyan-500 border-gray-300 rounded focus:ring-cyan-400"
                    checked={item.isFinished}
                  />
                  <span className="text-gray-800 text-lg sm:text-base line-clamp-1">
                    {item.description}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:mt-3 sm:w-full sm:justify-start">
                  <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:ring focus:ring-red-300">
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
    </div>
  );
};

export default Todo;
