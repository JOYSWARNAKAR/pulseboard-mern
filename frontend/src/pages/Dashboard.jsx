import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"


function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-slate-900">
            Your Dashboard
          </h1>
          <p className="text-subtle text-lg">
            Create, manage, and analyze your real-time polls.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example of a 'Create' Card */}
          <Link 
            to="/create"
            className="group p-8 rounded-2xl bg-white border border-border border-dashed hover:border-primary hover:bg-indigo-50/50 transition-all flex flex-col items-center justify-center text-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-primary flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              +
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Create New Poll</h3>
              <p className="text-subtle text-sm">Launch a new real-time survey</p>
            </div>
          </Link>
          
          {/* Placeholder for real polls - in a real app these would be mapped */}
          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">Active</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Quarterly Team Feedback</h3>
            <p className="text-subtle text-sm mb-6 line-clamp-2">How are we doing this quarter? Share your thoughts on our current projects.</p>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">124 Votes</span>
              <Link to="/analytics/1" className="text-primary hover:underline font-semibold">View Analytics →</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard