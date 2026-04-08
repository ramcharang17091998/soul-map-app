import { useState } from 'react';
import { QUESTIONS } from '../../data';
import type { UserResponse } from '../../types';

interface Props {
  responses: UserResponse[]; // The 13 Partner questions
  fullResponses: UserResponse[]; // All 27 questions
  onComplete: (data: UserResponse[]) => void;
}

export default function RealityCheck({ responses, fullResponses, onComplete }: Props) {
  const [mapping, setMapping] = useState<Record<number, string>>({});

  const handleFinish = () => {
    // Logic: If the user left a field blank, we default it to "No one yet"
    const finalData = fullResponses.map(res => {
      if (res.type === 'partner') {
        const userValue = mapping[res.questionId]?.trim();
        return { 
          ...res, 
          realLifeMatch: userValue || 'No one yet' 
        };
      }
      return res;
    });
    
    onComplete(finalData);
  };

  return (
    <div className="animate-in">
      <div className="sticky-header">
        <h2 className="text-xl font-black">Part 3: The Reality Bridge</h2>
        <p className="text-sm text-slate-500">Connecting your vision to the real world.</p>
      </div>

      <div className="p-6">
        <div className="bg-purple-50 p-4 rounded-2xl mb-8 border border-purple-100">
          <p className="text-sm text-purple-800 leading-relaxed padding-1">
            Look at your expectations below. Who is the closest example of this energy in your life? 
            <br /><span className="text-[10px] font-bold opacity-70">(Leave blank if no one fits yet)</span>
          </p>
        </div>

        {responses.map((res) => {
          const questionObj = QUESTIONS.find(q => q.id === res.questionId);
          
          return (
            <div key={res.questionId} className="mapping-card mb-10">
              <h4 className="text-md font-bold text-slate-800 mb-3">
                {questionObj?.text} 
              </h4>

              {/* User's Stage 2 Answer */}
              <div className="bg-slate-50 p-4 rounded-xl italic text-slate-600 text-sm border-l-4 border-purple-400 mb-5">
                "{res.answer}"
              </div>

              {/* Thoughtful Mapping Input */}
              <div className="name-input-box">
                <label className="text-purple-600 font-extrabold">
                  Does anyone embodies this energy?
                </label>
                <input
                  type="text"
                  placeholder="Type a name or leave blank..."
                  value={mapping[res.questionId] || ''}
                  onChange={(e) => setMapping(prev => ({ ...prev, [res.questionId]: e.target.value }))}
                />
              </div>
            </div>
          );
        })}

        {/* Button is now always enabled for a better UX */}
        <button 
          onClick={handleFinish} 
          className="main-btn mt-4 mb-20"
        >
          Finalize My Soul Map ➔
        </button>
      </div>
    </div>
  );
}