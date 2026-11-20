export const urlValid = (v) => {
  if (v === undefined || v === null || v === "") return true;
  if (typeof v !== "string") return false;
  if (v.startsWith("//")) return false;
  if (v.startsWith("/")) return true;
  if (/^data:image\//i.test(v)) return true;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};
