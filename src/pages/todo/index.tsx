const Todo = () => {
  const mockTodos = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];
  return (
    <div className="flex flex-col gap-2 px-2 lg:px-64 md:px-40 sm:px-24 py-4 sm:py-12 md:py-16">
      {mockTodos.map((item) => {
        return (
          <div
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 sm:flex-col sm:items-start"
            key={item}
          >
            {/* Checkbox and Task */}
            <div className="flex items-center gap-4 sm:w-full">
              <input
                type="checkbox"
                className="w-5 h-5 text-cyan-500 border-gray-300 rounded focus:ring-cyan-400"
              />
              <span className="text-gray-800 text-lg sm:text-base line-clamp-1">
                Task Name Goes Here
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
      })}
    </div>
  );
};

export default Todo;
