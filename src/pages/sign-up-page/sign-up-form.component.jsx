import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api/auth/register";
import PasswordInput from "../../components/forms/password-input.component";

function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    isTeacherRegistration: false,
    bio: "",
    department: "",
    parentPhoneNumer: "",
    grade: "",
    school: "",
  });

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: form.email,
      password: password,
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      dateOfBirth: form.dateOfBirth,
      address: form.address,
      phoneNumber: form.phoneNumber,
      isTeacherRegistration: form.isTeacherRegistration,
      bio: form.isTeacherRegistration ? form.bio : null,
      department: form.isTeacherRegistration ? form.department : null,
      parentPhoneNumer: !form.isTeacherRegistration
        ? form.parentPhoneNumer
        : null,
      grade: !form.isTeacherRegistration ? form.grade : null,
      school: !form.isTeacherRegistration ? form.school : null,
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
        <h2 className="mt-10 mb-4 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign up a new account
        </h2>
      </div>

      <div className="sm:mx-auto w-full max-w-4xl bg-blue-900 backdrop-blur rounded-xl p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="md:col-span-2 flex gap-8">
            <RoleButton
              active={!form.isTeacherRegistration}
              onClick={() =>
                setForm((f) => ({ ...f, isTeacherRegistration: false }))
              }
              label="Student"
            />
            <RoleButton
              active={form.isTeacherRegistration}
              onClick={() =>
                setForm((f) => ({ ...f, isTeacherRegistration: true }))
              }
              label="Teacher"
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
                  name="parentPhoneNumer"
                  value={form.parentPhoneNumer}
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
                className="w-full rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
        <p className="mt-4 text-center text-sm/6 text-gray-400">
          Already had an account?{" "}
          <a
            href="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-100">
        {label}
      </label>
      <input
        {...props}
        required
        className={`mt-2 block w-full rounded-md px-3 py-1.5 text-white outline-white/10 focus:outline-indigo-500 bg-white/5`}
      />
    </div>
  );
}

function SelectGender({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-100">Gender</label>
      <select
        name="gender"
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white"
      >
        <option value="Male" className="bg-blue-900 text-white">
          Male
        </option>
        <option value="Female" className="bg-blue-900 text-white">
          Female
        </option>
        <option value="Other" className="bg-blue-900 text-white">
          Other
        </option>
      </select>
    </div>
  );
}

function RoleButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-md px-3 py-2 text-sm font-semibold
        ${
          active
            ? "bg-indigo-500 text-white"
            : "bg-white/5 text-gray-300 hover:bg-white/10"
        }`}
    >
      {label}
    </button>
  );
}

export default SignupForm;
