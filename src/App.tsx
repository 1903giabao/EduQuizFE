import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import LoginPage from "./pages/login-page/login-page.component"
import StudentHomePage from "./pages/student-home-page/student-home-page.component"
import TeacherHomePage from "./pages/teacher-home-page/teacher-home-page.component"
import ProtectedRoute from "./components/common/protected-route.component"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<StudentHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Navigate to="/login" />} />
        <Route path="/teacher" element={
            <ProtectedRoute role="Teacher">
              <TeacherHomePage />
            </ProtectedRoute>
          } 
        />
        <Route path="/student" element={
            <ProtectedRoute role="Student">
              <StudentHomePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
