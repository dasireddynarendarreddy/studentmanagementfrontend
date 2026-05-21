
import { AddUser } from "../services/AddUser"
import { useState } from "react"
import { type ApiResponse } from "../types/response"
import { useEffect } from "react"
import './Add.css'
import { type CSSProperties } from "react";
import Modal from "./Modal"
import Avatar from './Avatar'
import Skeletion from "./Skeletion"
import CsvDownloader from 'react-csv-downloader';
import {useNavigate} from "react-router-dom";
function Add() {
    const navigate = useNavigate();
    /*const[data,setData] = useState({
        email: "",
        firstName: "",
        lastName: ""
    });*/
    const[isLoading,setIsLoading] = useState(false);
    const[users,setUsers] = useState<any[]>([]);
    const[showModal,setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const[copyUsers,setCopyUsers] = useState<any[]>([]); 
    const[datatoedit,setDatatoedit] = useState<any>(null);
  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
     setUsers(copyUsers.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(e.target.value.toLowerCase())||user.id.toString().includes(e.target.value)||user.email.toLowerCase().includes(e.target.value.toLowerCase());
    }));
    //onSearch(e.target.value); // sends search term up to parent
  };



   

  const toolbarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    background: "#fff",
    borderBottom: "1px solid #eee",
    gap: "12px",
  };

  const searchStyle = {
    flex: 1,
    maxWidth: "400px",
    padding: "9px 14px 9px 36px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    color: "#333",
  };

  const addBtnStyle = {
    background: "#3C3489",
    color: "#fff",
    border: "none",
    padding: "9px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const statCardStyle:CSSProperties= {
    background: "#f8f8fc",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "12px 20px",
    textAlign: "center",
    minWidth: "120px",
  };


    useEffect(() => {

        

        fetchUsers();
    }, []);

    const showUser = (id:string) => {
      navigate(`/students/${id}`);
    }
const fetchUsers = async () => {
          try {
            setIsLoading(true);
            const response: ApiResponse<any[]> = await AddUser.getAllUsers();
            setUsers(response.data);
            setCopyUsers(response.data);
            setIsLoading(false);
            console.log("Fetched Users:", response);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    /*const saveUser= async () => {
        setIsLoading(true);
        try {
            const response:ApiResponse<any> = await AddUser.addUser(data);
            if(response.success){
                alert(response.message || "User added successfully");
            }
            setData({
                email: "",
                firstName: "",
                lastName: ""
            });
        } catch (error) {
            console.error("Error adding user:", error);
        } finally {
            setIsLoading(false);
        }
    };*/
   const deleteUser = async (id: string) => {
        try {
          await AddUser.deleteUser(id);
          fetchUsers();
        }
        catch (error) {
            console.error("Error deleting user:", error);
        }
      }
  const editUser = async (id: string) => {
    setShowModal(true);
    let dataToEdit = users.find(u => u.id === id);
    console.log("User to edit:", dataToEdit);
    setDatatoedit(dataToEdit);
    console.log("Data to edit:", dataToEdit);
        try {
          
        }
        catch (error) {
            console.error("Error editing user:", error);
        }
      }

      /*const onClose = () => {
          setShowModal(false);
          setDatatoedit(null);
      }*/
      const onSave = () => {
        
        fetchUsers();
      }
      const addStudent = () => {
        setDatatoedit(null);
        setShowModal(true);
      }

  return (
    <div>
      

      {/* stat cards */}
      <div style={{
        display: "flex", gap: "16px",
        padding: "20px 24px",
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}>
        <div style={statCardStyle}>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#3C3489" }}>
            {users.length}
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
            Total students
          </div>
        </div>
        {/*<div style={statCardStyle}>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#1D9E75" }}>
            {users.filter(user => s.status === "active").length}
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
            Active
          </div>
        </div>*/}
        {/*<div style={statCardStyle}>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#EF9F27" }}>
            {students.filter(s => {
              const today = new Date();
              const created = new Date(s.createdAt);
              const diff = (today - created) / (1000 * 60 * 60 * 24);
              return diff <= 7;
            }).length}
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
            Added this week
          </div>
        </div>*/}
      </div>

      {/* search + add button toolbar */}
      <div style={toolbarStyle}>
        {/* search with icon */}
        <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)",
            color: "#aaa", fontSize: "16px",
          }}>&#128269;</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            style={searchStyle}
          />
        </div>

        {/* add student button */}
        <button
          style={addBtnStyle}
          onClick={() =>addStudent()}
        >
          &#43; Add Student
        </button>
         <div>
             <CsvDownloader
  filename="myfile"
  extension=".csv"
  separator=";"
  wrapColumnChar="'"
  datas={users}
>
  <button className="btn btn-success d-flex align-items-center gap-2">
    DOWNLOAD
  </button>
</CsvDownloader>
        </div>
      </div>
       
          
        


      {/* modal — only shows when button clicked */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSave={() => {
            onSave();
            setShowModal(false);
          }}
         student={datatoedit}
        />
      )}
    <table className="table table-striped p-3">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Mail</th>
      <th scope="col">ID</th>
      <th scope="col">Department</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      // Assuming you have a users array in your state
      isLoading?<Skeletion />:users.map((user, index) => (
        
       <tr key={index} className="align-middle cursor-pointer" onClick={() => showUser(user.id)}>
        
      <td>{index + 1}</td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>

    
      
    

    {/* name next to avatar */}
    
    <Avatar firstName={user.firstName} lastName={user.lastName} />
    <span>{user.firstName} {user.lastName}</span>

  </div>
    

        </td>
        <td>{user.email}</td>
      <td>{user.id}</td>
      <td>{user.department}</td>
     <td>
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    ...(user.status === "Active" 
      ? {
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb"
        }
      : {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb"
        }
    )
  }}>
    <span style={{
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: user.status === "Active" ? "#28a745" : "#dc3545"
    }} />
    {user.status}
  </span>
      </td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={(e) =>{
            e.stopPropagation()
           deleteUser(user.id)
        }}>
    <i className="bi bi-trash3"></i>
        </button>&nbsp; &nbsp;
        <button className="btn btn-primary btn-sm" onClick={(e) =>{
           e.stopPropagation()
           editUser(user.id)}}>
          <i className="bi bi-pencil-square"></i>
        </button>
        </td>
     
      
    </tr>
    
      ))
    }
  </tbody>
 
</table>

    </div>
  );
}
export default Add;