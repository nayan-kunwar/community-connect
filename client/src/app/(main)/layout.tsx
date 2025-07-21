
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="main-layout">
      {/* Your layout components */}
      {children}
    </div>
  );
}