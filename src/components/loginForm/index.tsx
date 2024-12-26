import axios from "axios";
import { useState } from "react";

const LoginForm = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login works")
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        usename: email,
        password: password,
      });
      console.log("response: " + response);
      setUser(response.data);
    } catch (err) {
      setError(error);
      console.log("error:" +error);
    }
  };
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Login
        </h1>
        <form onSubmit={loginHandler} className="space-y-4">
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
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
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
