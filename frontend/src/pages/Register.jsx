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
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={handleChange}
        />

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

        <button className="bg-green-600 w-full p-3 rounded">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have account?
          <Link to="/login" className="text-blue-400 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register