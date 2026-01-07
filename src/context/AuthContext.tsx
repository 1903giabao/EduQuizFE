import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosClient from "../services/api/axiosClient";
import { ApiResponse } from "../types/api-response";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await axiosClient.get<ApiResponse<User>>("auth/me");
      setUser(res.data.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchMe().finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await axiosClient.post("auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshMe: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
