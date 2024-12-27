import axios from "axios";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Please fill in both fields.");
      return;
    }
    try {
      
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      });
      setUser(response.data);
      if (response) {
        alert("Login success");
      }
    } catch (err) {
      setError("Wrong user name or password");
      console.log("error:" + err);
    }
  };
  useEffect(() => {
    if (user) {
      console.log("Updated user:", user);
      // Additional actions can go here
    }
  }, [user]);
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Login
        </h1>

        {/* Predefined credentials with Copy buttons */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Username: <strong>emilys</strong>
            </span>
            <button
              onClick={() => navigator.clipboard.writeText("emilys")}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Copy
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Password: <strong>emilyspass</strong>
            </span>
            <button
              onClick={() => navigator.clipboard.writeText("emilyspass")}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={loginHandler} className="space-y-4">
          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="User name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;