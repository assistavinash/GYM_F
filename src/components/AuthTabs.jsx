import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border shadow rounded">
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 w-1/2 ${activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 w-1/2 ${activeTab === "register" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      {/* ✅ Yeh conditional rendering honi chahiye */}
      {activeTab === "login" && <LoginForm />}
      {activeTab === "register" && <RegisterForm />}
    </div>
  );
};

export default AuthTabs;
