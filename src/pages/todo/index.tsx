import TodoList from "@components/todoList";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Todo = () => {
  const { t } = useTranslation();
  const testProp: string = "test";
  const [filterString, setFilterString] = useState<string>("all");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterString(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 px-2 lg:px-64 md:px-40 sm:px-24 py-4 sm:py-12 md:py-16 overflow-hidden">
      <div className="flex justify-between mt-6">
        <div className="flex justify-between items-center">
          <label htmlFor="filter" className="text-sm mr-2">
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
        <Link to="/createTodo">
          <button className="px-4 py-2 text-white bg-cyan-500 rounded-lg shadow hover:bg-cyan-600 focus:ring focus:ring-cyan-300 transition-colors duration-300">
            {t("button.addTodo")}
          </button>
        </Link>
      </div>
      <TodoList filterString={filterString} />
    </div>
  );
};

export default Todo;
