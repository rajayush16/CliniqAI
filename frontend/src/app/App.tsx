import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";
import { ToastProvider } from "../components/ui/toast";
import { router } from "./router";

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  );
}

