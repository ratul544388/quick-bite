export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-grow items-center justify-center">
      {children}
    </div>
  );
}
