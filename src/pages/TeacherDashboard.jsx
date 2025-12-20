import { useNavigate } from "react-router-dom"

function TeacherDashboard() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            <h2>Teacher Dashboard</h2>
            <p>Attendance & Quiz management</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default TeacherDashboard