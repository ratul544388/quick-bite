export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex-grow flex items-center justify-center pb-[35px]">
      {children}
    </div>
  );
}
