import React, { useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
async function login(){

}
async function logout(){

}
export function AllRoutes({children}: {children: React.ReactNode}) {
  const[loading, setLoading] = React.useState(true);
  const[user, setUser] = React.useState({name:"", email:""});


  useEffect(() => {
    // Simulate loading user data (e.g., from localStorage or an API)
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      // Simulate fetching user data with the token
      setUser({ name: "John Doe", email: "john.doe@example.com" });
      setLoading(false);
    }
    
  }, []);

  return (
        <>
            <AuthContext.Provider value={{isAuthenticated: !!user, login, logout,user,setUser,loading,setLoading}}>
               {loading&&<div>Loading...</div>}
               {!loading&&children}
            </AuthContext.Provider>
        </>
    )
}