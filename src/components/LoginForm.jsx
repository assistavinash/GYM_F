import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log("Login Success", res.data);

      // Store auth data
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      // Navigate based on role
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'trainer') navigate('/trainer');
      else navigate('/user');

    } catch (error) {
      console.log("Login error details:", error.response?.data); // 👈 shows exact cause
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl mb-4 font-bold">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white w-full p-2">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
