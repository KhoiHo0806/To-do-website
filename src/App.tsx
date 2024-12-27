import "./App.css";
import LoginForm from "@components/loginForm";
import Todo from "@pages/todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/layout";
import Intro from "./pages/intro";
import PageNotFound from "./pages/notFound";
import PrivateRoutes from "./privateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/todo"
            element={
              <PrivateRoutes>
                <Todo />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
