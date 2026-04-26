import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuth } from "../hooks/useAuth";
import { AnswerResult } from "../pages/AnswerResult";
import { AskQuestion } from "../pages/AskQuestion";
import { Dashboard } from "../pages/Dashboard";
import { History } from "../pages/History";
import { Landing } from "../pages/Landing";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { SavedPapers } from "../pages/SavedPapers";
import { Settings } from "../pages/Settings";
import { Signup } from "../pages/Signup";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "ask", element: <AskQuestion /> },
      { path: "answers/:id", element: <AnswerResult /> },
      { path: "history", element: <History /> },
      { path: "saved-papers", element: <SavedPapers /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

