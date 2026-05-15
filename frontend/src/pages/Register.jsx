import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import API from "../api/axios"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post("/auth/register", formData)

      navigate("/login")
    } catch (error) {
      alert(error.response.data.message)
    }
  }
    return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-surface to-violet-50">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-2xl shadow-xl shadow-slate-200/50 w-full max-w-md border border-border"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-subtle">Join PulseBoard today</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-subtle mb-1 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full p-4 rounded-xl bg-slate-50 focus:bg-white"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-subtle mb-1 ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              className="w-full p-4 rounded-xl bg-slate-50 focus:bg-white"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-subtle mb-1 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-xl bg-slate-50 focus:bg-white"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="bg-secondary hover:bg-violet-700 text-white w-full p-4 rounded-xl mt-8 font-semibold shadow-lg shadow-secondary/20">
          Register
        </button>

        <p className="mt-6 text-center text-subtle">
          Already have an account?
          <Link to="/login" className="text-secondary font-semibold ml-2 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register