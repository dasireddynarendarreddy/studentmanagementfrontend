import { useEffect, useState } from "react";
import { AddUser } from "@/services/AddUser";
import type { ApiResponse } from "@/types/response";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell,
  Pie, PieChart, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [data, totalData]       = useState<any[]>([]);
  const [course, setCourse]     = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<any[]>([]); // ✅ start empty
  const [loading, setLoading]   = useState(false);

  const COLORS  = ["#1D9E75", "#A32D2D"];
  const courses = ["CSE","ECE","Mechanical","Civil","Chemical","Aerospace","Biotechnology","EEE"];

  useEffect(() => { getTotalStudents(); }, []);

  const getTotalStudents = async () => {
    try {
      setLoading(true);
      const response: ApiResponse<any[]> = await AddUser.getAllUsers();
      const students = response.data; // ✅ use directly — don't rely on state

      // set raw data
      totalData(students);

      // ✅ Bug 1 fixed — use students not data
      const activeStudents   = students.filter((s: any) => s.status === "Active").length;
      const inactiveStudents = students.length - activeStudents;

      // ✅ Bug 2 fixed — set directly, don't spread old state
      setActiveIndex([
        { status: "Active",   count: activeStudents   },
        { status: "Inactive", count: inactiveStudents },
      ]);

      // course breakdown
      const courseData = courses.map(course => ({
        course,
        count: students.filter((s: any) => s.department === course).length
      }));
      setCourse(courseData); // ✅ set all at once — no loop needed

    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching students");
    } finally {
      setLoading(false); // ✅ always runs
    }
  };

  return (
    <div style={{ padding: "24px" }}>

      {/* bar chart */}
      <div style={{
        background: "#fff", borderRadius: "12px",
        padding: "16px", marginBottom: "20px",
        border: "0.5px solid #eee"
      }}>
        <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "12px" }}>
          Students by department
        </div>

        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", height:"300px", alignItems:"center" }}>
            <div style={{
              width:"28px", height:"28px",
              border:"3px solid #EEEDFE",
              borderTop:"3px solid #3C3489",
              borderRadius:"50%",
              animation:"spin 0.8s linear infinite"
            }} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={course}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="course" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip  />
              <Legend />
              <Bar
                dataKey="count"
                fill="#7F77DD"
                radius={[6,6,0,0]}
                activeBar={{ fill:"#534AB7" }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* pie chart */}
      <div style={{
        background: "#fff", borderRadius: "12px",
        padding: "16px", border: "0.5px solid #eee"
      }}>
        <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "12px" }}>
          Active vs inactive
        </div>

        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", height:"300px", alignItems:"center" }}>
            <div style={{
              width:"28px", height:"28px",
              border:"3px solid #EEEDFE",
              borderTop:"3px solid #3C3489",
              borderRadius:"50%",
              animation:"spin 0.8s linear infinite"
            }} />
          </div>
        ) : activeIndex.length === 0 ? (
          <div style={{ textAlign:"center", color:"#aaa", padding:"60px 0" }}>
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activeIndex}
                dataKey="count"
                nameKey="status"      // ✅ Bug 4 fixed
                innerRadius="55%"
                outerRadius="75%"
                cornerRadius={6}
                paddingAngle={5}
                isAnimationActive={true}
              >
                {/* ✅ Bug 3 fixed — Cell added */}
                {activeIndex.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} students`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}