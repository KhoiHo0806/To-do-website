import TodoList from "@components/todoList";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Todo = () => {
  const { t } = useTranslation();
  const testProp: string = "test";

  return (
    <div className="flex flex-col gap-2 px-2 lg:px-64 md:px-40 sm:px-24 py-4 sm:py-12 md:py-16 overflow-hidden">
      <div className="flex justify-end mt-6">
        <Link to="/createTodo">
          <button className="px-4 py-2 text-white bg-cyan-500 rounded-lg shadow hover:bg-cyan-600 focus:ring focus:ring-cyan-300 transition-colors duration-300">
            {t("button.addTodo")}
          </button>
        </Link>
      </div>
      <TodoList testProp={testProp} />
    </div>
  );
};

export default Todo;
