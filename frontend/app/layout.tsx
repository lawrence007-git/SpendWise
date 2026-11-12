import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            <header></header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
