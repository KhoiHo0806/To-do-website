import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Intro from "./pages/intro";
import PageNotFound from "./pages/notFound";

function App() {
  return ( 
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
