function Skeletion() {
  const skel = {
    height: "12px", borderRadius: "4px",
    background: "#424243",
    animation: "pulse 1.5s ease-in-out infinite"
  };
  return (
    <>
    <tr>
      <td><div style={{ ...skel, width: "32px", height: "32px", borderRadius: "50%" }} /></td>
      <td><div style={{ ...skel, width: "120px" }} /></td>
      <td><div style={{ ...skel, width: "150px" }} /></td>
      <td><div style={{ ...skel, width: "60px" }} /></td>
      <td><div style={{ ...skel, width: "80px" }} /></td>
      <td><div style={{ ...skel, width: "60px" }} /></td>
      <td><div style={{ ...skel, width: "80px" }} /></td>
    </tr>
    <tr>
      <td><div style={{ ...skel, width: "32px", height: "32px", borderRadius: "50%" }} /></td>
      <td><div style={{ ...skel, width: "120px" }} /></td>
      <td><div style={{ ...skel, width: "150px" }} /></td>
      <td><div style={{ ...skel, width: "60px" }} /></td>
      <td><div style={{ ...skel, width: "80px" }} /></td>
      <td><div style={{ ...skel, width: "60px" }} /></td>
      <td><div style={{ ...skel, width: "80px" }} /></td>
    </tr>
    <tr>
      <td><div style={{ ...skel, width: "32px", height: "32px", borderRadius: "50%" }} /></td>
      <td><div style={{ ...skel, width: "120px" }} /></td>
      <td><div style={{ ...skel, width: "150px" }} /></td>
      <td><div style={{ ...skel, width: "60px" }} /></td>
      <td><div style={{ ...skel, width: "80px" }} /></td>
      <td><div style={{ ...skel, width: "60px" }} /></td>
      <td><div style={{ ...skel, width: "80px" }} /></td>
    </tr>
    </>
  );
}
export default Skeletion;