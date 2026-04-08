import { useState } from 'react';
import type { UserResponse, Question } from '../../types';

interface Props {
  questions: Question[];
  onComplete: (data: UserResponse[]) => void;
  title: string;
  subtitle: string;
}

export default function StageOne({ questions, onComplete, title, subtitle }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleFinish = () => {
    const data: UserResponse[] = questions.map(q => ({
      questionId: q.id,
      answer: answers[q.id] || '',
      type: q.type
    }));
    onComplete(data);
  };

  const isComplete = questions.every(q => answers[q.id]?.trim());

  return (
    <div className="animate-in">
      <div className="sticky-header">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="p-6">
        {questions.map((q) => (
          <div key={q.id} className="input-group">
            <label>{q.text}</label>
            <textarea
              value={answers[q.id] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              placeholder="Reflect deeply here..."
            />
          </div>
        ))}

        <button 
          onClick={handleFinish} 
          disabled={!isComplete} 
          className="main-btn"
        >
          Continue ➔
        </button>
      </div>
    </div>
  );
}

// to build - npm run build
// to deploy - firebase deploy --only hosting