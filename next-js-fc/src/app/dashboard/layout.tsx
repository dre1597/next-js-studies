export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <h1>Dashboard</h1>
    { children }
    </body>
    </html>
  );
}
