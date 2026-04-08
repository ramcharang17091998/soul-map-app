import { useState, useEffect } from 'react';
import { QUESTIONS } from '../../data';
import type { UserResponse } from '../../types';

export default function StageOne({ onComplete }: { onComplete: (res: UserResponse[]) => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const count = Object.values(answers).filter(val => val.trim().length > 0).length;
    setProgress(Math.round((count / QUESTIONS.length) * 100));
  }, [answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result: UserResponse[] = QUESTIONS.map(q => ({
      questionId: q.id,
      answer: answers[q.id] ? answers[q.id].trim() : "",
      category: q.category
    }));
    onComplete(result);
  };

  return (
    <div className="animate-in">
      <div className="sticky-header">
        <div className="progress-bg">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{progress}% Soul Reflection Complete</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="section-head">💙 Part 1: Your Vision</div>
        {QUESTIONS.map((q, i) => (
          <div key={q.id}>
            {i === 12 && <div className="section-head mt-12">🧠 Part 2: Inner Needs</div>}
            <div className="input-group">
              <label>{i + 1}. {q.text}</label>
              <textarea 
                required
                placeholder="Share your thoughts here..."
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              />
            </div>
          </div>
        ))}
        <div className="px-6">
          <button type="submit" className="main-btn">
            Next: Reality Mapping ➔
          </button>
        </div>
      </form>
    </div>
  );
}