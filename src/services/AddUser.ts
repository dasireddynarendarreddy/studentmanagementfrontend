 import axios from "axios";
 const API_URL = "http://localhost:8080/api/";
  export  const AddUser= {
    addUser: async (user:any) => {
      try {
        const response = await axios.post(`${API_URL}add`, user);
        console.log("API Response:", response)
        return response.data;
      } catch (error) {
        console.error("Error adding user:", error);
        throw error;
      }
    }
    ,
    getAllUsers: async () => {
      try {
        const response = await axios.get(`${API_URL}all`);
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      } 
    },
    deleteUser: async (id:string) => {
      try {
        const response = await axios.delete(`${API_URL}remove/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    },
    getById:async (id:any) => {

      try {
        const response = await axios.get(`${API_URL}get/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
      }
      
    },
    updateUser: async (user:any) => {
      try {
        const response = await axios.patch(`${API_URL}edit`, user);
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
  }
}



 