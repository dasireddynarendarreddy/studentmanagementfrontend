function Avatar({ firstName, lastName }: { firstName: string; lastName: string }) {
  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`;
  };

  return (
    <div style={{
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "#EEEDFE",
      color: "#534AB7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "13px",
      fontWeight: "500",
      flexShrink: 0,
    }}>
      {getInitials(firstName, lastName)}
    </div>
  );
}
export default Avatar