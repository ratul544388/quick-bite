import { Header } from "@/components/header/header";
import { getCurrentUser } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import { LoaderProvider } from "@/providers/loader-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import ToastProvider from "@/providers/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickBite - Order Delicious Meals Online",
  description:
    "Explore a diverse menu and enjoy quick, hassle-free food delivery with QuickBite, your go-to food ordering platform.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body className={cn(inter.className, "bg-zinc-50")}>
          <QueryProvider>
            <ModalProvider />
            <ToastProvider />
            <LoaderProvider />
            <main className="flex flex-col min-h-screen gap-5">
              <Header currentUser={currentUser} />
              <div className="flex-1 flex-grow flex flex-col">{children}</div>
            </main>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
