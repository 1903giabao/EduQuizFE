import { useState } from "react"

function PasswordInput({ password, onChange }) {
  const [showPassword, setShowPassword] = useState("password");

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-100"
        >
          Password
        </label>
      </div>

      <div className="relative mt-2">
        <input
          id="password"
          name="password"
          type={showPassword ? "password" : "text"}
          required
          value={password}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="current-password"
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                                    text-base text-white outline-1 -outline-offset-1
                                    outline-white/10 placeholder:text-gray-500
                                    focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500
                                    sm:text-sm/6"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3
                                    text-gray-400 hover:text-gray-200 transition"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5
                                    c4.478 0 8.268 2.943 9.542 7
                                    -1.274 4.057-5.064 7-9.542 7
                                    -4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19
                                    c-5.523 0-10-4.477-10-10
                                    0-1.657.402-3.217 1.125-4.575M6.1 6.1
                                    A4.5 4.5 0 0117.9 17.9M3 3l18 18"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
