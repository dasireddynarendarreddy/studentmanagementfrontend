// components/StudentForm.jsx
import { useEffect, useState} from "react";

import {type CSSProperties} from "react";
import {AddUser} from "../services/AddUser";
function Modal({ onClose, onSave,student }: { onClose: () => void; onSave: () => void; student: any }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const[editMode,setEditMode] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({   
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
    });
    setEditMode(true);
  }}, [student])
  // validation
  const validate = () => {
    let newErrors:any= {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.firstName||formData.firstName.trim() === "") newErrors.firstName = "First name is required";
    if (!formData.lastName||formData.lastName.trim() === "") newErrors.lastName = "Last name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on type
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await AddUser.addUser(formData);
      onSave(); // refresh list in parent
      onClose(); // close modal
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // styles
  const overlay: CSSProperties = {
    position: "fixed", top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  };

  const modal: CSSProperties = {
    background: "#fff", borderRadius: "12px",
    padding: "28px", width: "420px",
    display: "flex", flexDirection: "column", gap: "16px",
  };

  const inputStyle = (hasError:any): CSSProperties => ({
    width: "100%", padding: "10px 12px",
    border: `1px solid ${hasError ? "#e44" : "#ddd"}`,
    borderRadius: "8px", fontSize: "14px",
    outline: "none", marginTop: "4px",
  });

  const labelStyle: CSSProperties = {
    fontSize: "13px", fontWeight: "500", color: "#444",
  };

  const errorStyle: CSSProperties = {
    fontSize: "12px", color: "#e44", marginTop: "3px",
  };

  return (
    <div style={overlay} onClick={onClose}>
      {/* stop click from closing when clicking inside modal */}
      <div style={modal} onClick={(e) => e.stopPropagation()}>

        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#222", margin: 0 }}>
            {editMode ? "Edit Student" : "Add New Student"}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#888" }}
          >
            &times;
          </button>
        </div>

        {/* email field */}
        <div>
          <label style={labelStyle}>
            Email <span style={{ color: "#e44" }}>*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle(errors.email)}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        {/* first name field */}
        <div>
          <label style={labelStyle}>
            First Name <span style={{ color: "#e44" }}>*</span>
          </label>
          <input
            name="firstName"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle(errors.firstName)}
          />
          {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
        </div>

        {/* last name field */}
        <div>
          <label style={labelStyle}>
            Last Name <span style={{ color: "#e44" }}>*</span>
          </label>
          <input
            name="lastName"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle(errors.lastName)}
          />
          {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
        </div>

        {/* buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "10px",
              border: "1px solid #ddd", borderRadius: "8px",
              background: "#fff", fontSize: "14px", cursor: "pointer", color: "#444",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 1, padding: "10px",
              border: "none", borderRadius: "8px",
              background: loading ? "#aaa" : "#3C3489",
              color: "#fff", fontSize: "14px", cursor: "pointer", fontWeight: "500",
            }}
          >
            {loading ? "Saving..." : "Save Student"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Modal;