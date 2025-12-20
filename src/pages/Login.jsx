import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/api/authService"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const result = await login(email, password)
            localStorage.setItem("token", result.token)
            localStorage.setItem("role", result.role)

            if (result.role === "Teacher") {
                navigate("/teacher")
            } else {
                navigate("/student")
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(p) => setPassword(p.target.value)}
                />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login