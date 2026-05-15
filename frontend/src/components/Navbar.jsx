import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="bg-slate-900 p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-2xl font-bold">
        Poll Platform
      </Link>

      <div className="flex gap-4">
        <Link to="/create">Create Poll</Link>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar