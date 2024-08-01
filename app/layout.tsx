import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal copy";
import { PracticeModal } from "@/components/modals/practice-modal.tsx";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verbi",
  description: "Learn with modern way....",
  icons: '/mascot.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <HeartsModal />
          <ExitModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
