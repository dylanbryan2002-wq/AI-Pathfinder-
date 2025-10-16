import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "@/lib/ThemeProvider";
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
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
