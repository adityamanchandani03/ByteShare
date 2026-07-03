var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { createContext, useContext, useState } from "react";
import { useGetMe } from "@workspace/api-client-react";
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("byteshare_token"));
  const { data: user, isLoading: isQueryLoading, refetch } = useGetMe({
    query: {
      enabled: !!token,
      retry: false
    }
  });
  const isLoading = !!token && isQueryLoading;
  const login = /* @__PURE__ */ __name((newToken) => {
    localStorage.setItem("byteshare_token", newToken);
    setToken(newToken);
  }, "login");
  const logout = /* @__PURE__ */ __name(() => {
    localStorage.removeItem("byteshare_token");
    setToken(null);
  }, "logout");
  return <AuthContext.Provider
    value={{
      user: user || null,
      isLoading,
      login,
      logout
    }}
  >
      {children}
    </AuthContext.Provider>;
}
__name(AuthProvider, "AuthProvider");
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
__name(useAuth, "useAuth");
export {
  AuthProvider,
  useAuth
};
