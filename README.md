# Prept — AI Career Copilot & Mock Interview Platform

Prept is a modern, AI-powered platform designed to revolutionize the way candidates prepare for interviews. It connects interviewees with expert mentors and provides state-of-the-art tools for practicing, recording, and receiving feedback on mock interview sessions.

## 🚀 Key Features

### 1. AI-Powered Mock Interviews
- **Real-time Video & Audio**: High-quality video calls powered by Stream Video SDK.
- **Integrated Chat**: Seamless communication during sessions.
- **One-Click Recording**: Interviewers can record sessions for later review.
- **AI Question Generator**: Generate role-specific technical and behavioral questions on-the-fly using Google Gemini AI.

### 2. Comprehensive Dashboards
- **Interviewer Dashboard**: Manage availability slots, track earnings, and handle withdrawal requests.
- **Interviewee Dashboard**: Track upcoming sessions, browse expert interviewers, and view past performance.

### 3. Smart Feedback & Analytics
- **Automated AI Feedback**: Receive detailed analysis of technical accuracy, communication style, and problem-solving skills after every session.
- **Session Recordings**: Watch recorded sessions to identify areas for improvement.

### 4. Secure & Scalable Infrastructure
- **Secure Authentication**: Fully integrated with Clerk for identity management.
- **Rate Limiting & Protection**: Secured by Arcjet to prevent abuse.
- **Performance Optimized**: Built with Next.js 15+ and Turbopack for lightning-fast speeds.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript / JavaScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: Clerk
- **Video/Chat**: Stream.io
- **AI Model**: Google Gemini 2.0 Flash
- **Styling**: Tailwind CSS 4.0
- **Email**: Resend

## 🏁 Getting Started

### Prerequisites
- Node.js 20+
- A PostgreSQL database
- API Keys for: Clerk, Stream.io, Google AI Studio (Gemini), Arcjet, and Resend.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vedant128/AI-Career-Copilot-Resume-Analyzer-Job-Match-Engine.git
   cd AI-Career-Copilot-Resume-Analyzer-Job-Match-Engine
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your keys (refer to `.env.example` if available).

4. **Initialize the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License.

---
Built with ❤️ for better career preparation.
