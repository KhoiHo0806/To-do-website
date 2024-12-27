import "./App.css";
import LoginForm from "@components/loginForm";
import CreateTodo from "@pages/createTodo";
import Todo from "@pages/todo";
import PrivateRoutes from "@protected/privateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/layout";
import Intro from "./pages/intro";
import PageNotFound from "./pages/notFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Intro />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Private Routes */}
          {/* <Route
            path="/todo"
            element={
              <PrivateRoutes>
                <Todo />
              </PrivateRoutes>
            }
          />
          <Route
            path="/createTodo"
            element={
              <PrivateRoutes>
                <CreateTodo />
              </PrivateRoutes>
            }
          /> */}
          <Route element={<PrivateRoutes />}>
            <Route path="/todo" element={<Todo />} />
            <Route path="/createTodo" element={<CreateTodo />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
