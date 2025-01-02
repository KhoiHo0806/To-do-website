import TodoList from "@components/todoList";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useDebounce from "@customHooks/useDebounce";

const Todo = () => {
  const { t } = useTranslation();
  const [filterString, setFilterString] = useState<string>("all");
  const [searchString, setSearchString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const debouncedSearchString = useDebounce(searchString,300)

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterString(e.target.value);
  };

  const handlerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  // test counter
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };
  const testFunction = useCallback(() => {
    console.log("todo page function run");
  }, []);

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-8 md:px-16 lg:px-64 py-4 sm:py-8 md:py-12 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <label htmlFor="filter" className="text-sm">
            {t("label.filter")}
          </label>
          <select
            id="filter"
            value={filterString}
            onChange={handleFilterChange}
            className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-cyan-300"
          >
            <option value="all">{t("label.all")}</option>
            <option value="finished">{t("label.finished")}</option>
          </select>
        </div>

        <div className="flex justify-center py-4 sm:py-0 w-full sm:w-auto">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={searchString}
              onChange={handlerSearchChange}
              placeholder="Search..."
              className="w-full px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.293 12.293a7.5 7.5 0 111.414-1.414 8.955 8.955 0 001.517 1.416A9.958 9.958 0 1013.293 12.293zM14.5 7.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <Link to="/createTodo">
          <button className="px-4 py-2 text-white bg-cyan-500 rounded-lg shadow hover:bg-cyan-600 focus:ring focus:ring-cyan-300 transition-colors duration-300">
            {t("button.addTodo")}
          </button>
        </Link>
      </div>

      <TodoList
        filterString={filterString}
        searchString={debouncedSearchString}
        testFunction={testFunction}
      />

      {/* test counter */}
      <div className="flex flex-col items-center p-4">
        <h1 className="text-xl font-bold mb-4">Counter: {count}</h1>
        <div className="flex gap-4">
          <button
            onClick={increment}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Decrement
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
