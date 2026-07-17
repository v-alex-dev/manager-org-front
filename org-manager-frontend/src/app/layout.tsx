import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppQueryProvider } from "@/lib/query/query-provider";
import { AuthProvider } from "@/lib/auth/auth-context";

export const metadata: Metadata = {
  title: "ORG-Manager",
  description: "Gestion des reunions CFG et Comite",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ORG-Manager",
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-dvh antialiased font-sans">
        <AppQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppQueryProvider>
      </body>
    </html>
  );
}
