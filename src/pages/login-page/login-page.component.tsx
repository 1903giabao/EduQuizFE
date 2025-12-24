import { useState } from "react";
import LoginForm from "./login-form.component";
import SignupForm from "../sign-up-page/sign-up-form.component";

function LoginPage() {
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const [showForm, setShowForm] = useState<Boolean>(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);

    setTimeout(() => {
      setShowForm(!showForm);
    }, 250);
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Form Container */}
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

      {/* Image Container */}
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
