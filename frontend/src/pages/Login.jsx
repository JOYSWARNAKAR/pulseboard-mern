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
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={handleChange}
        />

        <button className="bg-blue-600 w-full p-3 rounded">
          Login
        </button>

        <p className="mt-4 text-center">
          No account?
          <Link to="/register" className="text-blue-400 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login