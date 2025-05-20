export const decodeGlobalId = (globalId: string): { id: string, type: string } => {
  try {
    const decoded = atob(globalId); 
    const [id, type] = decoded.split(":");
    return { id, type };
  } catch (e) {
    console.error("Invalid Global ID", e);
    return { id: "", type: "" };
  }
};
