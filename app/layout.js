import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import Header from "@/components/Header";

const lora = Lora({
  subsets: ['latin'],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "InterviewXpert",
  description: "An intelligent interview assistant that evaluates resumes, conducts simulated interviews, and generates tailored preparation roadmaps for efficient job readiness.",
};

export default function RootLayout({ children }) {
  return (


    <html lang="en" suppressHydrationWarning>
      <body className={`${lora.variable} ${dmSans.variable} font-sans`}>
        <ClerkProvider appearance={{
          theme: dark,
        }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            {/* {Footer }*/}
          </ThemeProvider>

        </ClerkProvider>
      </body>
    </html >

  );
}
