import { Header } from "@/components/header/header";
import { getCurrentUser } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import { LoaderProvider } from "@/providers/loader-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import ToastProvider from "@/providers/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(inter.className, "dark:bg-neutral-950 flex flex-col")}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <Header currentUser={currentUser} />
              <main className="flex-1 mt-[80px]">
                {children}
              </main>
              <ModalProvider />
              <SheetProvider user={currentUser} />
              <ToastProvider />
              <LoaderProvider />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
