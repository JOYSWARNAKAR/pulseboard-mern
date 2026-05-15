import Navbar from "../components/Navbar"

function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-4">
          Dashboard
        </h1>

        <p>
          Create and manage your polls.
        </p>
      </div>
    </div>
  )
}

export default Dashboard