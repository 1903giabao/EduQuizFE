import { useNavigate } from "react-router-dom"

function StudentDashboard() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    
    return (
        <div>
            <h2>Student Dashboard</h2>
            <p>Take quizzed & view grades</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default StudentDashboard