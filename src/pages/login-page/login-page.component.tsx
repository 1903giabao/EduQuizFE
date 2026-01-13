import { useEffect, useState } from "react";
import LoginForm from "./login-form.component";
import SignupForm from "../sign-up-page/sign-up-form.component";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginRoute = location.pathname !== "/signup";
  const [isLogin, setIsLogin] = useState<boolean>(isLoginRoute);
  const [showForm, setShowForm] = useState<boolean>(isLoginRoute);
  const { user, loading } = useAuth();

  if (loading) return;

  if (user) {
    return <Navigate to="/schedule" replace />;
  }

  const toggleForm = () => {
    setIsLogin((prev) => !prev);

    setTimeout(() => {
      setShowForm((prev) => !prev);
    }, 250);

    navigate(isLogin ? "/signup" : "/login", { replace: true });
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      <div
        className={`w-1/2 h-full flex items-center justify-center transition-transform duration-700 ${
          isLogin ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full p-8 flex flex-col justify-center bg-white h-full">
          {showForm ? (
            <LoginForm onSwitch={toggleForm} />
          ) : (
            <SignupForm onSwitch={toggleForm} />
          )}
        </div>
      </div>
      <div
        className={`w-1/2 h-full transition-transform duration-700 ${
          isLogin ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <img
          src="/_ White Blue Modern Website Design Template Website Facebook Post.png"
          alt="Right Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default LoginPage;
