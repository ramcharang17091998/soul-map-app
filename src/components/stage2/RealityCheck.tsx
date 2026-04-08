import { useState } from 'react';
import { QUESTIONS } from '../../data';
import type { UserResponse } from '../../types';

export default function RealityCheck({ responses, onComplete }: { responses: UserResponse[], onComplete: (res: UserResponse[]) => void }) {
  const [mapping, setMapping] = useState<Record<number, string>>({});

  const handleFinish = () => {
    const finalData = responses.map(res => ({
      ...res,
      realLifeMatch: mapping[res.questionId] || "N/A"
    }));
    onComplete(finalData);
  };

  return (
    <div className="animate-in pb-12">
      <div className="px-8 pt-12 pb-6 text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Trait Mapping 🔍</h1>
        <p className="text-slate-500 mt-2">Who in your life already exhibits these traits?</p>
      </div>

      {responses.map((res, i) => {
        const qText = QUESTIONS.find(q => q.id === res.questionId)?.text;
        return (
          <div key={res.questionId} className="mapping-card mx-6">
            <div className="q-preview">
              <p className="text-[10px] font-black uppercase text-purple-500 tracking-widest mb-1">Trait {i + 1}</p>
              <p className="font-bold text-slate-800 text-sm leading-tight">{qText}</p>
              <div className="bg-slate-50 p-4 rounded-2xl mt-3 border border-slate-100">
                <p className="italic text-slate-500 text-sm">"{res.answer}"</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Person with this trait:</label>
              <input 
                type="text" 
                placeholder="Name or N/A"
                value={mapping[res.questionId] || ""}
                onChange={(e) => setMapping(prev => ({ ...prev, [res.questionId]: e.target.value }))}
                className="w-full border-b-2 border-slate-200 focus:border-purple-500 outline-none py-2 text-lg font-bold bg-transparent"
              />
            </div>
          </div>
        );
      })}

      <div className="px-6">
        <button onClick={handleFinish} className="main-btn">
          Analyze My Data ➔
        </button>
      </div>
    </div>
  );
}