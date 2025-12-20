import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Login from "./pages/Login"
import StudentDashboard from "./pages/StudentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={
            <ProtectedRoute role="Teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/student" element={
            <ProtectedRoute role="Student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
