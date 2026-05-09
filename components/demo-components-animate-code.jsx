'use client';

import {
    Code,
    CodeBlock,
    CodeHeader,
} from '@/components/animate-ui/components/animate/code';
import { Code2, File } from 'lucide-react';



export const CodeDemo = ({
    duration,
    delay,
    writing,
    cursor,
}) => {
    return (
        <Code
            key={`${duration}-${delay}-${writing}-${cursor}`}
            className="w-full sm:w-110 h-120 border-none"
            code={`'use client';

import * as React from 'react';

type InterviewProps = {
  role: string;
  confidence: number;
};

const skills = [
  'React ⚛️',
  'Node.js 🚀',
  'DSA 🧠',
  'System Design 🏗️',
];

function InterviewXpert({
  role,
  confidence,
}: InterviewProps) {

  const panicLevel =
    confidence < 40
      ? '😭 Sweating'
      : '😎 Ready';

  return (
    <div className="space-y-2">
      
      <h1>
        🎯 Cracking {role}
      </h1>

      <p>
        Status: {panicLevel}
      </p>

      <div>
        {skills.map((skill) => (
          <span key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <button>
        Start Mock Interview 💼
      </button>

    </div>
  );
}

export default InterviewXpert;`}
        >
            <CodeHeader icon={Code2} copyButton>
                use-fetch.jsx
            </CodeHeader>

            <CodeBlock
                cursor={cursor}
                lang="jsx"
                writing={writing}
                duration={duration}
                delay={delay}
            />
        </Code>
    );
};