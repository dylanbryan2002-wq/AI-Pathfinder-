import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { AuthProvider } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Pathfinder - Your Personal Career Advisor",
  description: "Discover, explore, and commit to your ideal career path with AI-powered guidance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
