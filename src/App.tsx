import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-page/login-page.component";
import ProtectedRoute from "./components/common/protected-route.component";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import MyClassPage from "./pages/MyClassesPage/MyClassPage";
import { Role } from "./types/role";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route
            element={<ProtectedRoute roles={[Role.Student, Role.Teacher]} />}
          >
            <Route path="/classes" element={<MyClassPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
