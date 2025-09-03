
// import { createContext, useState, useContext, useEffect } from "react"

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Check if user is logged in from localStorage
//     const savedUser = localStorage.getItem("user")
//     const token = localStorage.getItem("token")

//     if (savedUser && token) {
//       setUser(JSON.parse(savedUser))
//       setIsLoggedIn(true)
//     }
//     setLoading(false)
//   }, [])

//   const login = (userData, token) => {
//     setIsLoggedIn(true)
//     setUser(userData)
//     localStorage.setItem("user", JSON.stringify(userData))
//     localStorage.setItem("token", token)
//   }

//   const logout = () => {
//     setIsLoggedIn(false)
//     setUser(null)
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")
//   }

//   const value = {
//     isLoggedIn,
//     user,
//     login,
//     logout,
//     loading,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }



import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    try {
      // Check that savedUser is not the string "undefined" or null
      if (savedUser && savedUser !== "undefined" && token) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        // Clear corrupted or invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error parsing saved user from localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, []);

  // Login function
 const login = (userData, token) => {
  console.log("Login called with:", userData, token);

  if (userData && token) {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  } else {
    console.error("Invalid login data", { userData, token });
  }
};

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
