import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api/auth/login/login";
import PasswordInput from "../../components/forms/password-input.component";

type LoginFormProps = {
  onSwitch: () => void;
};

function LoginForm({ onSwitch }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);

    if (result?.errorMessage) {
      setError(result.errorMessage);
      return;
    }

    if (result?.role === "Teacher") {
      navigate("/teacher");
    } else {
      navigate("/student");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={`/EduQuizLogo.png`}
            alt="Take a break Image"
            className="w-20 h-20"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-black/2">
            Log in to your account
          </h2>
          <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="mt-4 text-gray-500">Welcome back! Sweetie!</p>
          </div>
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {<p className="text-red-400 text-sm text-center">{error}</p>}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-500"
              >
                Email address
              </label>
              <div className="mt-2">
                <div className="rounded-md bg-white/5 p-[2px] ring-2 ring-gray-500 transition">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black placeholder:text-gray-500 outline-none sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <PasswordInput
              password={password}
              onChange={(e) => setPassword(e)}
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue4167cd px-3 py-1.5 text-sm/8 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an account?{" "}
            <a
              onClick={onSwitch}
              className="font-semibold text-blue4167cd hover:text-indigo-500 cursor-pointer"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
