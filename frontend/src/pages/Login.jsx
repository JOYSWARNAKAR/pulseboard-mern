import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import API from "../api/axios"
import { AuthContext } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()

  const { setUser } = useContext(AuthContext)

  const [formData, setFormData] = useState({
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
      const res = await API.post("/auth/login", formData)

      localStorage.setItem("token", res.data.token)

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      )

      setUser(res.data.user)

      navigate("/dashboard")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-surface to-indigo-50">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-2xl shadow-xl shadow-slate-200/50 w-full max-w-md border border-border"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-subtle">Login to manage your polls</p>
        </div>

        <div className="space-y-4">
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

        <button className="bg-primary hover:bg-primary-hover text-white w-full p-4 rounded-xl mt-8 font-semibold shadow-lg shadow-primary/20">
          Login
        </button>

        <p className="mt-6 text-center text-subtle">
          Don't have an account?
          <Link to="/register" className="text-primary font-semibold ml-2 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login