import {
  ButtonHTMLAttributes,
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api/auth/register/register";
import PasswordInput from "../../components/forms/password-input.component";
import { RegisterPayload } from "../../services/api/auth/register/register-payload";

type SignupFormProps = {
  onSwitch: () => void;
};

function SignupForm({ onSwitch }: SignupFormProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterPayload>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    isTeacherRegistration: false,
    bio: "",
    department: "",
    parentPhoneNumber: "",
    grade: "",
    school: "",
  });

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const payload: RegisterPayload = {
      ...form,
      password,
    };

    const result = await register(payload);

    if (result?.errorMessage) {
      setError(result.errorMessage);
      return;
    }

    console.log(error);

    navigate("/login");
  };

  return (
    <div className="flex min-h-full items-center flex-col justify-center px-4 py-6 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 mb-4 text-center text-2xl/9 font-bold tracking-tight text-black">
          Sign up a new account
        </h2>
      </div>

      <div className="sm:mx-auto w-full max-w-4xl bg-white backdrop-blur rounded-xl p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="md:col-span-2 flex gap-8">
            <RoleButton
              active={!form.isTeacherRegistration}
              onClick={() =>
                setForm((f) => ({ ...f, isTeacherRegistration: false }))
              }
              label="As a Student"
            />
            <RoleButton
              active={form.isTeacherRegistration}
              onClick={() =>
                setForm((f) => ({ ...f, isTeacherRegistration: true }))
              }
              label="As a Teacher"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <PasswordInput
              password={password}
              onChange={(e) => setPassword(e)}
            />

            <Input
              label="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            <Input
              label="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />

            <SelectGender value={form.gender} onChange={handleChange} />
            <Input
              type="date"
              label="Date of birth"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
            />

            <Input
              label="Phone number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            {form.isTeacherRegistration && (
              <>
                <Input
                  label="Bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                />
                <Input
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                />
              </>
            )}

            {!form.isTeacherRegistration && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Parent phone number"
                  name="parentPhoneNumber"
                  value={form.parentPhoneNumber}
                  onChange={handleChange}
                />
                <Input
                  label="Grade"
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                />
                <Input
                  label="School"
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-blue4167cd px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
        <p className="mt-4 text-center text-sm/6 text-gray-400">
          Already had an account?{" "}
          <a
            onClick={onSwitch}
            className="font-semibold text-blue4167cd hover:text-indigo-500 cursor-pointer"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

function Input({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500">{label}</label>
      <div className="mt-2">
        <div className="rounded-md bg-white/5 p-[2px] ring-2 ring-gray-500 transition">
          <input
            {...props}
            required
            className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black placeholder:text-gray-500 outline-none sm:text-sm`}
          />
        </div>
      </div>
    </div>
  );
}

function SelectGender({
  value,
  onChange,
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500">Gender</label>
      <div className="mt-2">
        <div className="rounded-md bg-white/5 p-[2px] ring-2 ring-gray-500 transition">
          <select
            name="gender"
            value={value}
            onChange={onChange}
            className="w-full rounded-md bg-white/5 px-3 py-1.5 text-black"
          >
            <option value="Male" className="bg-gray text-black">
              Male
            </option>
            <option value="Female" className="bg-gray text-black">
              Female
            </option>
            <option value="Other" className="bg-gray text-black">
              Other
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

function RoleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-md px-3 py-2 text-sm font-semibold
        ${
          active
            ? "bg-blue4167cd text-white"
            : "bg-gray-200 text-gray-500 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );
}

export default SignupForm;
