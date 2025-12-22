import { useNavigate } from "react-router-dom"

function TeacherHomePage() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div>
            <h2>Teacher Dashboard</h2>
            <p>Attendance & Quiz management</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default TeacherHomePage