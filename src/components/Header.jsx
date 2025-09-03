// "use client"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"

// const Header = ({ title, showBackButton = false, showLogout = false }) => {
//   const navigate = useNavigate()
//   const { logout } = useAuth()

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       logout()
//       navigate("/login")
//     }
//   }

//   const handleBack = () => {
//     navigate(-1)
//   }

//   return (
//     <header className="bg-blue-500 text-white shadow-lg">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           {showBackButton && (
//             <button onClick={handleBack} className="text-white hover:bg-blue-600 p-2 rounded">
//               ←
//             </button>
//           )}
//           <h1 className="text-xl font-bold">{title}</h1>
//         </div>

//         {showLogout && (
//           <button onClick={handleLogout} className="text-white hover:bg-blue-600 px-3 py-2 rounded text-sm">
//             Logout
//           </button>
//         )}
//       </div>
//     </header>
//   )
// }

// export default Header

"use client"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaHome } from "react-icons/fa"  // ✅ Home icon

const Header = ({ title, showBackButton = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout()
      navigate("/login")
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate("/Home")
  }

  return (
    <header className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="text-white hover:bg-blue-600 p-2 rounded"
            >
              ←
            </button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>

        {location.pathname === "/Home" ? (
          // ✅ Home page la asel tar logout button
          <button
            onClick={handleLogout}
            className="text-white hover:bg-blue-600 px-3 py-2 rounded text-sm"
          >
            <b>Logout</b>
          </button>
        ) : (
          // ✅ baki saglya page la Home icon
          <button
            onClick={handleGoHome}
            className="text-white hover:bg-blue-600 p-2 rounded-full"
          >
            <FaHome size={18} />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header

