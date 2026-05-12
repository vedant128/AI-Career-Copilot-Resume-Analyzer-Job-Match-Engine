import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import Header from "@/components/Header";
import { Toaster } from "sonner";

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
    <ClerkProvider appearance={{ theme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${lora.variable} ${dmSans.variable} font-sans bg-black text-white`}>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>

            <Toaster richColors />

            <footer className="border-t border-white/10 bg-black text-white">
              <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                  {/* Brand */}
                  <div>
                    <h2 className="text-2xl font-bold text-green-400">
                      InterviewXpert
                    </h2>
                    <p className="mt-4 text-gray-400 leading-relaxed">
                      AI-powered interview preparation platform helping students
                      crack technical and HR interviews with confidence.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
                      <li><a href="#" className="hover:text-green-400 transition">Features</a></li>
                      <li><a href="#" className="hover:text-green-400 transition">Interviewers</a></li>
                      <li><a href="#" className="hover:text-green-400 transition">Pricing</a></li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
                      <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
                      <li><a href="#" className="hover:text-green-400 transition">Support</a></li>
                      <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-transparent px-4 py-3 w-full outline-none text-sm"
                      />
                      <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-3 transition">
                        Join
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-3">
                      Get interview tips and updates weekly.
                    </p>
                  </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                  <p>© 2026 InterviewXpert. All rights reserved.</p>
                  <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-green-400 transition">Terms of Service</a>
                    <a href="#" className="hover:text-green-400 transition">Cookies</a>
                  </div>
                </div>
              </div>
            </footer>

        </body>
      </html>
    </ClerkProvider>
  );
}