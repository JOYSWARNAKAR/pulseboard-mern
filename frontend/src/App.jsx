import {
  Routes,
  Route,
} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CreatePoll from "./pages/CreatePoll"
import PublicPoll from "./pages/PublicPoll"
import Analytics from "./pages/Analytics"
import PublishedResults from "./pages/PublishedResults"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePoll />
          </ProtectedRoute>
        }
      />

      <Route
        path="/poll/:id"
        element={<PublicPoll />}
      />

      <Route
        path="/analytics/:id"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results/:id"
        element={<PublishedResults />}
      />

    </Routes>
  )
}

export default App