export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full grid place-items-center pb-[35px]">
      {children}
    </div>
  );
}
