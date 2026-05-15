import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg rotate-12 flex items-center justify-center text-white text-sm -rotate-12">P</div>
        PulseBoard
      </Link>

      <div className="flex items-center gap-6">
        <Link 
          to="/create" 
          className="text-muted hover:text-primary font-medium transition-colors"
        >
          Create Poll
        </Link>

        <button 
          onClick={logout}
          className="bg-slate-100 hover:bg-slate-200 text-main px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar