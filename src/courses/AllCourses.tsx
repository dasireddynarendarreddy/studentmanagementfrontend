// pages/Courses.tsx
import { useState, useEffect, useMemo } from "react";
import { AddUser } from "@/services/AddUser";
import { toast } from "react-toastify";
import { type CSSProperties } from "react";

const DEPARTMENTS = [
    "All",
  "CSE",
  "ECE",
  "Mechanical",
  "Civil",
  "Chemical",
  "Aerospace",
  "Biotechnology",
  "EEE"
]


const DEPT_COLORS: any = {
  CSE:    { bg: "#EEEDFE", color: "#3C3489" },
  ECE:    { bg: "#E6F1FB", color: "#185FA5" },
  MECH:   { bg: "#FAEEDA", color: "#854F0B" },
  CIVIL:  { bg: "#E1F5EE", color: "#0F6E56" },
  CHEM:   { bg: "#FBEAF0", color: "#993556" },
  AERO:   { bg: "#FAECE7", color: "#993C1D" },
  BIOTECH:{ bg: "#EAF3DE", color: "#3B6D11" },
  EEE:    { bg: "#FCEBEB", color: "#A32D2D" },
};

const DEPT_BAR_COLORS: any = {
  CSE: "#7F77DD", ECE: "#378ADD",
  MECH: "#EF9F27", CIVIL: "#1D9E75",
  CHEM: "#D4537E", AERO: "#D85A30",
  BIOTECH: "#639922", EEE: "#A32D2D",
};

export default function AllCourses() {
  const [students, setStudents]       = useState<any[]>([]);
  const [loading, setLoading]         = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await AddUser.getAllUsers();
      setStudents(res.data);
    } catch {
      toast.error("Failed to load students!");
    } finally {
      setLoading(false);
    }
  };

  // ── derive everything from students ──────────────
  const totalEnrolled = students.length;
  const totalActive   = useMemo(() =>
    students.filter(s => s.status === "Active").length,
  [students]);

  // course cards data
  const courseData = useMemo(() => {
    const depts = selectedTab === "All"
      ? DEPARTMENTS.filter(d => d !== "All")
      : [selectedTab];

    return depts.map(dept => {
      const enrolled = students.filter(s => s.department === dept);
      const active   = enrolled.filter(s => s.status === "Active").length;
      const pct      = totalEnrolled > 0
        ? Math.round((enrolled.length / totalEnrolled) * 100) : 0;
      return { dept, enrolled: enrolled.length, active, inactive: enrolled.length - active, pct };
    }).filter(c => c.enrolled > 0); // only show courses with students
  }, [students, selectedTab, totalEnrolled]);

  // students for selected dept detail
  const deptStudents = useMemo(() => {
    if (!selectedDept) return [];
    return students.filter(s => s.department === selectedDept);
  }, [students, selectedDept]);

  const getInitials = (f: string, l: string) =>
    `${f?.charAt(0).toUpperCase()}${l?.charAt(0).toUpperCase()}`;

  // ── styles ──────────────────────────────────────
  const page: CSSProperties = {
    padding: "24px",
    background: "#f5f5f8",
    minHeight: "100vh",
  };

  const card: CSSProperties = {
    background: "#fff",
    border: "0.5px solid #eee",
    borderRadius: "12px",
    padding: "14px",
  };

  return (
    <div style={page}>

      {/* page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: "500", color: "#222" }}>Courses</div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>Manage all departments and enrolled students</div>
        </div>
        <button style={{
          background: "#3C3489", color: "#fff",
          border: "none", padding: "8px 16px",
          borderRadius: "8px", fontSize: "13px",
          cursor: "pointer", display: "flex",
          alignItems: "center", gap: "6px"
        }}>
          + Add course
        </button>
      </div>

      {/* stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
        {[
          { label: "Total courses",   value: DEPARTMENTS.length - 1, color: "#3C3489" },
          { label: "Total enrolled",  value: totalEnrolled,           color: "#0F6E56" },
          { label: "Active students", value: totalActive,             color: "#854F0B" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "0.5px solid #eee", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontSize: "22px", fontWeight: "500", color: s.color }}>
              {loading ? "..." : s.value}
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* department tabs */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
        {DEPARTMENTS.map(dept => (
          <button
            key={dept}
            onClick={() => {
              setSelectedTab(dept);
              setSelectedDept(null); // reset detail on tab change
            }}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
              border: selectedTab === dept ? "none" : "0.5px solid #ddd",
              background: selectedTab === dept ? "#3C3489" : "#fff",
              color: selectedTab === dept ? "#fff" : "#666",
              transition: "all 0.15s",
            }}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* loading */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
          <div style={{
            width: "28px", height: "28px",
            border: "3px solid #EEEDFE",
            borderTop: "3px solid #3C3489",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }} />
        </div>
      )}

      {/* course cards grid */}
      {!loading && (
        <>
          {courseData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#aaa" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📚</div>
              <div style={{ fontSize: "14px" }}>No students in this department yet</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              {courseData.map((c, i) => {
                const clr = DEPT_COLORS[c.dept] || { bg: "#EEEDFE", color: "#3C3489" };
                const barClr = DEPT_BAR_COLORS[c.dept] || "#7F77DD";
                const isSelected = selectedDept === c.dept;

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDept(isSelected ? null : c.dept)}
                    style={{
                      ...card,
                      cursor: "pointer",
                      border: isSelected ? "1.5px solid #3C3489" : "0.5px solid #eee",
                      transition: "border-color 0.15s",
                    }}
                  >
                    {/* top row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div style={{
                        width: "34px", height: "34px",
                        borderRadius: "8px",
                        background: clr.bg, color: clr.color,
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "11px",
                        fontWeight: "500"
                      }}>
                        {c.dept.slice(0,3)}
                      </div>
                      <span style={{
                        fontSize: "10px", padding: "3px 8px",
                        borderRadius: "20px", background: "#E1F5EE",
                        color: "#0F6E56"
                      }}>
                        {c.enrolled} students
                      </span>
                    </div>

                    {/* name */}
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#222", marginBottom: "2px" }}>
                      {c.dept}
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>
                      Department
                    </div>

                    {/* progress bar */}
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#888", marginBottom: "3px" }}>
                        <span>Enrollment</span>
                        <span>{c.pct}%</span>
                      </div>
                      <div style={{ background: "#f0f0f0", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                        <div style={{ width: `${c.pct}%`, background: barClr, height: "100%", borderRadius: "4px" }} />
                      </div>
                    </div>

                    {/* stats */}
                    <div style={{
                      display: "grid", gridTemplateColumns: "repeat(3,1fr)",
                      gap: "6px", paddingTop: "10px",
                      borderTop: "0.5px solid #eee"
                    }}>
                      {[
                        { label: "Active",   value: c.active,   color: "#0F6E56" },
                        { label: "Inactive", value: c.inactive, color: "#A32D2D" },
                        { label: "Total",    value: c.enrolled, color: "#3C3489" },
                      ].map((s, j) => (
                        <div key={j} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "15px", fontWeight: "500", color: s.color }}>{s.value}</div>
                          <div style={{ fontSize: "10px", color: "#888", marginTop: "1px" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* click hint */}
                    <div style={{ fontSize: "11px", color: "#3C3489", marginTop: "8px", textAlign: "center" }}>
                      {isSelected ? "▲ Hide students" : "▼ View students"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* student detail — shows when card clicked */}
          {selectedDept && deptStudents.length > 0 && (
            <div style={{ ...card, marginTop: "4px" }}>

              {/* detail header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "8px",
                  background: DEPT_COLORS[selectedDept]?.bg || "#EEEDFE",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "500",
                  color: DEPT_COLORS[selectedDept]?.color || "#3C3489"
                }}>
                  {selectedDept.slice(0,3)}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#222" }}>
                    {selectedDept} — Students enrolled
                  </div>
                  <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
                    {deptStudents.length} students &nbsp;·&nbsp;
                    {deptStudents.filter(s => s.status === "Active").length} active &nbsp;·&nbsp;
                    {deptStudents.filter(s => s.status !== "Active").length} inactive
                  </div>
                </div>
              </div>

              {/* student rows */}
              {deptStudents.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 0",
                  borderBottom: i < deptStudents.length - 1 ? "0.5px solid #eee" : "none"
                }}>
                  {/* avatar */}
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: DEPT_COLORS[s.department]?.bg || "#EEEDFE",
                    color: DEPT_COLORS[s.department]?.color || "#3C3489",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "10px",
                    fontWeight: "500", flexShrink: 0
                  }}>
                    {getInitials(s.firstName, s.lastName)}
                  </div>

                  {/* name */}
                  <div style={{ flex: 1, fontSize: "13px", color: "#222" }}>
                    {s.firstName} {s.lastName}
                  </div>

                  {/* email */}
                  <div style={{ fontSize: "12px", color: "#888", marginRight: "8px" }}>
                    {s.email}
                  </div>

                  {/* status badge */}
                  <span style={{
                    fontSize: "10px", padding: "2px 8px",
                    borderRadius: "20px",
                    background: s.status === "Active" ? "#E1F5EE" : "#FCEBEB",
                    color: s.status === "Active" ? "#0F6E56" : "#A32D2D",
                    marginRight: "8px"
                  }}>
                    {s.status}
                  </span>

                  {/* actions */}
                  <button style={{
                    fontSize: "11px", padding: "3px 7px",
                    borderRadius: "4px", border: "0.5px solid #85B7EB",
                    background: "#E6F1FB", color: "#185FA5",
                    cursor: "pointer", marginRight: "3px"
                  }}>
                    Edit
                  </button>
                  <button style={{
                    fontSize: "11px", padding: "3px 7px",
                    borderRadius: "4px", border: "0.5px solid #F09595",
                    background: "#FCEBEB", color: "#A32D2D", cursor: "pointer"
                  }}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}