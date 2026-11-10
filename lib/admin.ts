export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.toLowerCase());
}
