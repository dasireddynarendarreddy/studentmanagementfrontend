// pages/StudentProfile.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type CSSProperties } from "react";
import { AddUser } from "../services/AddUser";
import Modal from "../student/Modal"
import { toast } from "react-toastify";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await AddUser.getById(id);
      console.log("Fetched student:", response);
      setStudent(response);
    } catch (error) {
      toast.error("Failed to load student!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
        let res=''+id;
      await AddUser.deleteUser(res);
      toast.success("Student deleted!");
      navigate("/students");
    } catch (error) {
      toast.error("Failed to delete student!");
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0).toUpperCase()}${lastName?.charAt(0).toUpperCase()}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  // ── styles ──────────────────────────────────────────
  const page: CSSProperties = {
    background: "var(--color-background-secondary, #f5f5f8)",
    minHeight: "100vh",
    padding: "1.5rem",
  };

  const backBtn: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "6px",
    fontSize: "13px", color: "var(--color-text-secondary, #666)",
    border: "0.5px solid #ddd", background: "#fff",
    padding: "6px 12px", borderRadius: "8px",
    cursor: "pointer", marginBottom: "1rem",
  };

  const card: CSSProperties = {
    background: "#fff", border: "0.5px solid #eee",
    borderRadius: "12px", overflow: "hidden",
    maxWidth: "680px", margin: "0 auto",
  };

  const cardTop: CSSProperties = {
    background: "#3C3489",
    padding: "1.5rem 1.5rem 3rem",
  };

  const topRow: CSSProperties = {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
  };

  const topLabel: CSSProperties = {
    fontSize: "12px", color: "#AFA9EC",
  };

  const topActions: CSSProperties = {
    display: "flex", gap: "8px",
  };

  const avatarSection: CSSProperties = {
    display: "flex", alignItems: "flex-end", gap: "1rem",
    marginTop: "-2rem", padding: "0 1.5rem",
  };

  const avatarLg: CSSProperties = {
    width: "72px", height: "72px", borderRadius: "50%",
    background: "#EEEDFE", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontSize: "22px", fontWeight: "500", color: "#3C3489",
    border: "3px solid #fff", flexShrink: 0,
  };

  const cardBody: CSSProperties = {
    padding: "1.5rem",
  };

  const sectionTitle: CSSProperties = {
    fontSize: "11px", fontWeight: "500",
    color: "#888", textTransform: "uppercase",
    letterSpacing: "0.5px", marginBottom: "12px",
  };

  const infoGrid: CSSProperties = {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "12px", marginBottom: "1.5rem",
  };

  const infoItem: CSSProperties = {
    background: "#f8f8fc", borderRadius: "8px", padding: "12px 14px",
  };

  const infoLabel: CSSProperties = {
    fontSize: "11px", color: "#888",
    marginBottom: "4px", display: "flex",
    alignItems: "center", gap: "5px",
  };

  const infoValue: CSSProperties = {
    fontSize: "14px", fontWeight: "500", color: "#222",
  };

  const divider: CSSProperties = {
    border: "none", borderTop: "0.5px solid #eee", margin: "0 0 1.5rem",
  };

  const activityRow: CSSProperties = {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "8px 0", borderBottom: "0.5px solid #eee",
    fontSize: "13px",
  };

  const footerBtns: CSSProperties = {
    display: "flex", gap: "8px",
    padding: "1rem 1.5rem",
    borderTop: "0.5px solid #eee",
  };

  // ── skeleton loader ──────────────────────────────────
  if (loading) {
    return (
      <div style={page}>
        <div style={{ ...card, padding: "1.5rem", maxWidth: "680px", margin: "0 auto" }}>
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} style={{
              height: "16px", borderRadius: "6px",
              background: "#EEEDFE", marginBottom: "14px",
              width: i === 0 ? "40%" : i === 1 ? "70%" : i === 2 ? "55%" : "85%",
              animation: "pulse 1.5s ease-in-out infinite",
            }} />
          ))}
        </div>
      </div>
    );
  }

  // ── not found ────────────────────────────────────────
  if (!student) {
    return (
      <div style={{ ...page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>&#128581;</div>
          <div style={{ fontSize: "16px", fontWeight: "500", color: "#222" }}>Student not found</div>
          <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>
            The student you are looking for does not exist
          </div>
          <button
            onClick={() => navigate("/students")}
            style={{
              marginTop: "16px", padding: "9px 20px",
              background: "#3C3489", color: "#fff",
              border: "none", borderRadius: "8px",
              fontSize: "14px", cursor: "pointer",
            }}
          >
            Back to students
          </button>
        </div>
      </div>
    );
  }

  // ── main render ──────────────────────────────────────
  return (
    <div style={page}>

      {/* back button */}
      <button style={backBtn} onClick={() => navigate("/students")}>
        &#8592; Back to students
      </button>

      <div style={card}>

        {/* purple header */}
        <div style={cardTop}>
          <div style={topRow}>
            <div style={topLabel}>Student profile</div>
            <div style={topActions}>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", padding: "5px 12px",
                  borderRadius: "8px", cursor: "pointer",
                  border: "none", background: "#534AB7", color: "#EEEDFE",
                }}
              >
                &#9998; Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", padding: "5px 12px",
                  borderRadius: "8px", cursor: "pointer",
                  border: "none", background: "#A32D2D", color: "#FCEBEB",
                }}
              >
                &#128465; Delete
              </button>
            </div>
          </div>
        </div>

        {/* avatar overlapping header */}
        <div style={avatarSection}>
          <div style={avatarLg}>
            {getInitials(student.firstName, student.lastName)}
          </div>
          <div style={{ paddingBottom: "6px" }}>
            <div style={{ fontSize: "18px", fontWeight: "500", color: "#222", display: "flex", alignItems: "center", gap: "8px" }}>
              {student.firstName} {student.lastName}
              <span style={{
                fontSize: "11px", padding: "3px 10px",
                borderRadius: "20px", background: "#E1F5EE",
                color: "#0F6E56", display: "inline-flex",
                alignItems: "center", gap: "4px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1D9E75", display: "inline-block" }} />
                {student.status== "Active" ? "Active" : "Inactive"}
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "#888", marginTop: "3px" }}>
              Student ID: #{student.id}
            </div>
          </div>
        </div>

        {/* card body */}
        <div style={cardBody}>

          {/* personal info */}
          <div style={sectionTitle}>Personal information</div>
          <div style={infoGrid}>
            <div style={infoItem}>
              <div style={infoLabel}>&#128100; First name</div>
              <div style={infoValue}>{student.firstName}</div>
            </div>
            <div style={infoItem}>
              <div style={infoLabel}>&#128100; Last name</div>
              <div style={infoValue}>{student.lastName}</div>
            </div>
            <div style={infoItem}>
              <div style={infoLabel}>&#128231; Email</div>
              <div style={{ ...infoValue, color: "#185FA5", fontWeight: "400", fontSize: "13px" }}>
                {student.email}
              </div>
            </div>
            <div style={infoItem}>
              <div style={infoLabel}>&#127991; Student ID</div>
              <div style={infoValue}>#{student.id}</div>
            </div>
            <div style={infoItem}>
              <div style={infoLabel}>&#128197; Enrolled on</div>
              <div style={infoValue}>{formatDate(student.createdDate
)}</div>
            </div>
            <div style={infoItem}>
              <div style={infoLabel}>&#128336; Last updated</div>
              <div style={infoValue}>{formatDate(student.lastUpdatedDate)}</div>
            </div>
          </div>

          {/* divider */}
          <hr style={divider} />

          {/* activity */}
          <div style={sectionTitle}>Recent activity</div>
          <div style={activityRow}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#EEEDFE", color: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>+</div>
            <div style={{ flex: 1, color: "#333", fontSize: "13px" }}>Student record created</div>
            <div style={{ fontSize: "12px", color: "#888" }}>{formatDate(student.createdDate)}</div>
          </div>
          <div style={{ ...activityRow, borderBottom: "none" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#E6F1FB", color: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>&#9998;</div>
            <div style={{ flex: 1, color: "#333", fontSize: "13px" }}>Profile last updated</div>
            <div style={{ fontSize: "12px", color: "#888" }}>{formatDate(student.lastUpdatedDate)}</div>
          </div>

        </div>

        {/* footer buttons */}
        <div style={footerBtns}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              flex: 1, padding: "9px", fontSize: "13px",
              borderRadius: "8px", cursor: "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "6px",
              background: "#EEEDFE", color: "#3C3489",
              border: "0.5px solid #AFA9EC",
            }}
          >
            &#9998; Edit student
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              flex: 1, padding: "9px", fontSize: "13px",
              borderRadius: "8px", cursor: "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "6px",
              background: "#FCEBEB", color: "#A32D2D",
              border: "0.5px solid #F09595",
            }}
          >
            &#128465; Delete student
          </button>
        </div>

      </div>

      {/* edit modal */}
      {showModal && (
        <Modal
          student={student}
          onClose={() => setShowModal(false)}
          onSave={() => {
            fetchStudent();
            setShowModal(false);
          }}
        />
      )}

      {/* delete confirmation popup */}
      {showDeleteConfirm && (
        <div style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "#fff", borderRadius: "12px",
            padding: "28px", width: "380px",
            display: "flex", flexDirection: "column", gap: "12px",
          }}>
            <div style={{ fontSize: "18px", fontWeight: "500", color: "#222" }}>
              Delete student?
            </div>
            <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.5" }}>
              Are you sure you want to delete <strong>{student.firstName} {student.lastName}</strong>? This action cannot be undone.
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1, padding: "10px", fontSize: "14px",
                  border: "1px solid #ddd", borderRadius: "8px",
                  background: "#fff", cursor: "pointer", color: "#444",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1, padding: "10px", fontSize: "14px",
                  border: "none", borderRadius: "8px",
                  background: "#A32D2D", color: "#fff",
                  cursor: "pointer", fontWeight: "500",
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default StudentProfile;