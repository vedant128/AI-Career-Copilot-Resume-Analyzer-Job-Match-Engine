"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";
import { request } from "@arcjet/next";
import { createRateLimiter, checkRateLimit } from "@/lib/arcjet";

const CATEGORY_PROMPTS = {
    FRONTEND: "React, JavaScript, CSS, performance, accessibility, browser APIs",
    BACKEND:
        "Node.js, REST APIs, databases, authentication, caching, scalability",
    FULLSTACK:
        "full-stack architecture, API design, state management, deployment",
    DSA: "data structures, algorithms, time complexity, problem solving",
    SYSTEM_DESIGN:
        "distributed systems, scalability, databases, microservices, caching",
    BEHAVIORAL:
        "leadership, teamwork, conflict resolution, career growth, STAR method",
    DEVOPS: "CI/CD, Docker, Kubernetes, cloud infrastructure, monitoring",
    MOBILE:
        "React Native, iOS/Android, performance, offline support, app lifecycle",
};

// Rate limiter: 5 generations per user per hour
const aiQuestionsLimiter = createRateLimiter({
    refillRate: 5,
    interval: "1h",
    capacity: 5,
});

// In-memory dedup cache: key = `${userId}:${category}`, TTL = 30s
// Prevents bursts from double-clicks / React Strict Mode double-invocations
const recentCache = new Map();
const CACHE_TTL_MS = 30_000;

export const generateInterviewQuestions = async ({ category }) => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    if (!category || !CATEGORY_PROMPTS[category])
        throw new Error("Invalid category");

    // 1. Dedup: return cached result if same request was made within 30s
    const cacheKey = `${user.id}:${category}`;
    const cached = recentCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
        return cached.data;
    }

    // 2. Rate limit: max 5 per hour per user
    const req = await request();
    const rateLimitError = await checkRateLimit(aiQuestionsLimiter, req, user.id);
    if (rateLimitError) throw new Error(rateLimitError);

    // 3. Call Gemini — fall back to mock questions if API quota is exceeded
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `You are an expert technical interviewer. Generate 6 interview questions for a ${category} role covering: ${CATEGORY_PROMPTS[category]}.

For each question, provide a concise but complete answer (2-4 sentences) that an interviewer can use to evaluate responses.

Respond ONLY with a valid JSON array. No markdown, no backticks, no explanation. Example format:
[{"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}]`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        const clean = text.replace(/^```json|^```|```$/gm, "").trim();
        const questions = JSON.parse(clean);

        const data = { questions };
        recentCache.set(cacheKey, { ts: Date.now(), data });
        setTimeout(() => recentCache.delete(cacheKey), CACHE_TTL_MS);
        return data;

    } catch (err) {
        // On quota / network errors return static mock data so the UI still works
        const isQuotaError = err?.status === 429 || err?.message?.includes("429");
        if (!isQuotaError) throw err; // re-throw real errors

        console.warn("[aiQuestions] Gemini quota exceeded — returning mock questions");

        const data = {
            questions: [
                {
                    question: `What are the core concepts every ${category} developer should know?`,
                    answer: "This is a mock answer shown because the Gemini API quota is exceeded. Get a free key from https://aistudio.google.com/app/apikey.",
                },
                {
                    question: "How do you approach debugging a complex issue?",
                    answer: "Mock answer: Isolate the problem, add logging, reproduce in a minimal environment, then fix and add a regression test.",
                },
                {
                    question: "Describe a challenging project and how you handled it.",
                    answer: "Mock answer: Choose a specific example, explain the challenge, your approach, the outcome, and what you learned.",
                },
                {
                    question: "How do you ensure code quality in your projects?",
                    answer: "Mock answer: Code reviews, automated testing, linting, CI/CD pipelines, and consistent coding standards.",
                },
                {
                    question: "What's your process for learning new technologies?",
                    answer: "Mock answer: Build a small project, read official docs, follow community resources, and practice regularly.",
                },
                {
                    question: "How do you handle disagreements with teammates on technical decisions?",
                    answer: "Mock answer: Listen actively, present data-backed arguments, seek consensus, and accept the team's decision gracefully.",
                },
            ],
            isMock: true,
        };

        recentCache.set(cacheKey, { ts: Date.now(), data });
        setTimeout(() => recentCache.delete(cacheKey), CACHE_TTL_MS);
        return data;
    }
};
