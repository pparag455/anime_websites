// app/auth/login/layout.js
export const dynamic = "force-dynamic"; // This forces the fix you wanted

export default function LoginLayout({ children }) {
  return <>{children}</>;
}